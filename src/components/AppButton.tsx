import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { fontPixel, pixelSizeVertical } from "../config/normalise";

import colors from "./colors";

interface props {
  onPress: () => void;
  title: string;
  color?: keyof typeof colors;
  disabled?: boolean;
}

function AppButtons({ title, onPress, color = "primary", disabled }: props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: colors[color], opacity: disabled ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: pixelSizeVertical(50),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: pixelSizeVertical(10),
  },
  text: {
    color: "white",
    fontSize: fontPixel(16),
  },
});

export default AppButtons;
