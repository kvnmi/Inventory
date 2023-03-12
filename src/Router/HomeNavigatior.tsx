import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./navTypes";
import ListingScreen from "../Screens/InventoryListings";
import EditInventory from "../Screens/EditInventory";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* @ts-ignore */}
    <Stack.Screen name="HomeBase" component={ListingScreen} />
    <Stack.Screen name="EditListing" component={EditInventory} />
  </Stack.Navigator>
);

export default HomeNavigator;
