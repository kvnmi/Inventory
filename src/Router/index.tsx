import React, { useCallback, useEffect, useState } from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { View } from "react-native";
import AuthStackNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import NavigationTheme from "./navigationTheme";
import { IUser } from "../interfaces/IUser";
import storage from "../Auth/storage";
import jwtDecode from "jwt-decode";
import * as SplashScreen from "expo-splash-screen";
import AuthContext from "../Auth/context";

const index = () => {
  const [routeName, setRouteName] = useState<string>();
  const [user, setUser] = useState<IUser | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  async function checkForUser() {
    try {
      const token = await storage.getUser();
      if (!token) return;
      setUser(JSON.parse(token));
    } catch (error) {
      console.warn(error);
    } finally {
      setAppIsReady(true);
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  //  if (!appIsReady) return null;

  useEffect(() => {
    checkForUser();
  }, []);

  const ref = createNavigationContainerRef();

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer
          theme={NavigationTheme}
          // theme={NavigationTheme}
          ref={ref}
          onReady={() => {
            setRouteName(ref.getCurrentRoute()?.name);
          }}
          onStateChange={async () => {
            setRouteName(ref.getCurrentRoute()?.name);
          }}
        >
          {user ? (
            <AppNavigator routeName={routeName} />
          ) : (
            <AuthStackNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
};

export default index;
