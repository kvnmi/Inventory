import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { StyleSheet } from "react-native";
import Router from "./src/Router";

export default function App() {
  return (
    <Fragment>
      <Router />
      <StatusBar style="auto" />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/* 
<View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
*/
