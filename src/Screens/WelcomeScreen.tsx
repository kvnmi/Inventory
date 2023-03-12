import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButtons from "../components/AppButton";
import {
  fontPixel,
  heightPixel,
  normalise,
  pixelSizeVertical,
} from "../config/normalise";
import { AuthStackScreenProps } from "../Router/navTypes";

function WelcomeScreen({ navigation }: AuthStackScreenProps<"Welcome">) {
  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Sell stuff you don't need</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButtons
          title="LOGIN"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: heightPixel(100),
    height: heightPixel(100),
  },
  tagline: {
    paddingVertical: 10,
    fontWeight: "600",
    fontSize: fontPixel(20),
    fontStyle: "italic",
  },
  logocontainer: {
    position: "absolute",
    top: pixelSizeVertical(70),
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: normalise(20),
  },
});
export default WelcomeScreen;
