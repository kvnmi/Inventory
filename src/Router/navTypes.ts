import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { IInventories } from "../interfaces/IInventory";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

export type HomeStackParamList = {
  HomeBase: undefined;
  EditListing: { item: IInventories };
};

export type AppTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  CreateListing: undefined;
};

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;

export type AppNavScreenProps<Screen extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, Screen>,
    NativeStackScreenProps<HomeStackParamList>
  >;
