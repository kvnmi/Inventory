import React, { FC } from "react";
import { fontPixel } from "../config/normalise";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "./colors";

interface props {
  error?: string;
  visible?: boolean;
}

const ErrorMessage: FC<props> = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <AppText style={styles.text}>{error}</AppText>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.red,
    fontSize: fontPixel(12),
    marginLeft: fontPixel(10),
    fontWeight: "200",
  },
});

export default ErrorMessage;
