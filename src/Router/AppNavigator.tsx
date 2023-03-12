import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import colors from "../components/colors";
import { heightPixel, normalise } from "../config/normalise";
import HomeNavigator from "./HomeNavigatior";
import { AppTabParamList } from "./navTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CreateInventory from "../Screens/CreateInventory";

const Tab = createBottomTabNavigator<AppTabParamList>();

interface props {
  routeName?: string;
}

const AppNavigator = ({ routeName }: props) => {
  const showBar = routeName === "HomeBase";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "android" ? heightPixel(65) : heightPixel(90),
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.lightgrey,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home"
              size={normalise(size)}
              color={color}
            />
          ),
          tabBarStyle: {
            height:
              Platform.OS === "android" ? heightPixel(65) : heightPixel(90),
            display: showBar ? "flex" : "none",
          },
        }}
      />
      <Tab.Screen
        name="CreateListing"
        component={CreateInventory}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={normalise(size)}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
