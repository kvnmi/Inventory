import React, { Children } from "react";
import { Text, StyleSheet, Platform, TextStyle, TextProps } from "react-native";
import { fontPixel } from "../config/normalise";

interface props {
  children: React.ReactNode;
  style?: TextStyle;
}

function AppText({ children, style, ...otherProps }: props & TextProps) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontPixel(16),
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
