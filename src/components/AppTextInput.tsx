import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../components/colors";
import { fontPixel } from "../config/normalise";

interface props {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  width?: string;
}

function AppTextInput({
  icon,
  width = "100%",
  ...otherProps
}: props & TextInputProps) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          color={colors.mediumgrey}
          size={25}
          style={styles.iconStyle}
        />
      )}
      <TextInput
        style={styles.text}
        {...otherProps}
        placeholderTextColor={colors.mediumgrey}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.lightgrey,
    padding: 8,
    paddingLeft: 13,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: fontPixel(14),
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "black",
    width: "100%",
  },
  iconStyle: {
    marginRight: 8,
  },
});

export default AppTextInput;
