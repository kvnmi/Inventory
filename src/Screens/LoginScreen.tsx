import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import useAuth from "../Auth/useAuth";
import AppTextInput from "../components/AppTextInput";
import AppButtons from "../components/AppButton";
import {
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "../config/normalise";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const disabled = !email || !password;

  const { logIn } = useAuth();

  async function handleLogin() {
    if (disabled) return;
    logIn({ username: email, password, uid: email });
  }

  return (
    <Screen style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo-red.png")} />
      <AppTextInput
        icon="email"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={true}
        onChangeText={(text) => setEmail(text)}
      />
      <AppTextInput
        icon="lock"
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        autoCorrect={false}
        onChangeText={(text) => setpassword(text)}
      />

      <AppButtons
        title="Login"
        onPress={handleLogin}
        color={"primary"}
        disabled={disabled}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  image: {
    height: heightPixel(80),
    width: widthPixel(80),
    marginVertical: pixelSizeHorizontal(35),
    alignSelf: "center",
  },
});

export default LoginScreen;
