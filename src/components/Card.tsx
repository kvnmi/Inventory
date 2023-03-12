import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { heightPixel, normalise, pixelSizeVertical } from "../config/normalise";
import { IInventories } from "../interfaces/IInventory";
import AppText from "./AppText";
import colors from "./colors";

interface ICardProps {
  data: IInventories;
  onPress: () => void;
}

function Card({ data, onPress }: ICardProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: data.themeColor ? data.themeColor : colors["primary"],
          },
        ]}
      >
        <View style={styles.imageTitle}>
          <AppText>{data.name}</AppText>
          <AppText style={styles.subtitle}>₦{data.price}</AppText>
        </View>
        <View style={[styles.imageTitle, { alignItems: "flex-end" }]}>
          <AppText>Stock</AppText>
          <AppText>{data.totalStock}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: pixelSizeVertical(20),
    overflow: "hidden",
    borderLeftWidth: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: normalise(20),
    height: heightPixel(100),
  },

  imageTitle: {
    paddingVertical: normalise(10),
    justifyContent: "space-between",
  },
  subtitle: {
    color: colors.secondary,
    marginTop: 5,
  },
});

export default Card;
