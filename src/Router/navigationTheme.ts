import { DefaultTheme } from "@react-navigation/native";
import colors from "../components/colors";

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: "white",
  },
};

export default NavigationTheme;
