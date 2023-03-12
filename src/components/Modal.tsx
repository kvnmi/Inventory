import React, { FC } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativeModal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  fontPixel,
  heightPixel,
  normalise,
  pixelSizeVertical,
  widthPixel,
} from "../config/normalise";
import colors from "./colors";
import AppText from "./AppText";
import AppButton from "./AppButton";

interface Props {
  isActive: boolean;
  onPress: () => void;
  onClose: () => void;
  message: string;
  confirmText: string;
  deleteText: string;
  imgType?: "failure" | "success";
}

const index: FC<Props> = ({
  isActive,
  onPress,
  onClose,
  confirmText,
  deleteText,
  message,
  imgType = "success",
}) => {
  const imgUrl =
    imgType === "success"
      ? require("../assets/SuccessIcon.png")
      : require("../assets/ErrorIcon.png");
  return (
    <View style={{ flex: 1 }}>
      <ReactNativeModal
        isVisible={isActive}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onSwipeComplete={onClose}
        swipeDirection={["down"]}
        onBackdropPress={onClose}
      >
        <View style={styles.screen}>
          <MaterialCommunityIcons
            name="close"
            style={{
              alignSelf: "flex-end",
              backgroundColor: colors.lightBlue,
              padding: normalise(10),
              borderRadius: 10,
            }}
            size={normalise(20)}
            onPress={onClose}
          />
          <View>
            <Image source={imgUrl} style={styles.image} />
          </View>
          <AppText style={styles.about}>{message}</AppText>
          {confirmText.length > 1 && (
            <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
              <AppText
                style={[
                  styles.deleteText,
                  { color: colors.secondary, fontWeight: "700" },
                ]}
              >
                {confirmText}
              </AppText>
            </TouchableOpacity>
          )}
          {deleteText.length > 1 && (
            <TouchableOpacity style={styles.deleteButton} onPress={onClose}>
              <AppText style={[styles.deleteText, { color: colors.primary }]}>
                {deleteText}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: normalise(20),
    backgroundColor: "white",
    borderTopRightRadius: normalise(25),
    borderTopLeftRadius: normalise(25),
  },
  image: {
    width: widthPixel(65),
    height: heightPixel(65),
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: normalise(10),
  },
  about: {
    fontSize: fontPixel(16),
    textAlign: "center",
    marginVertical: pixelSizeVertical(20),
  },
  deleteButton: {
    padding: normalise(10),
    alignSelf: "center",
  },
  deleteText: {
    fontSize: fontPixel(15),
  },
});

export default index;
