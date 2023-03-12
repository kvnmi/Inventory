import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { fontPixel, normalise } from "../config/normalise";
import AppText from "./AppText";
import colors from "./colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface props {
  title: string;
  onPress: () => void;
}

export default function Header({ title, onPress }: props) {
  return (
    <View style={styles.container}>
      <AppText style={styles.header}>Listings</AppText>
      <Pressable style={styles.btnCtn} onPress={onPress}>
        <MaterialCommunityIcons
          name="logout"
          size={normalise(20)}
          color={colors.logout}
        />
        <AppText style={styles.leftText}>Logout</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: normalise(15),
  },
  header: {
    fontWeight: "bold",
  },
  btnCtn: { flexDirection: "row", alignItems: "center" },
  leftText: {
    fontSize: fontPixel(12),
    fontWeight: "bold",
    color: colors.logout,
  },
});
