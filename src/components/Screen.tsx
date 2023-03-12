import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ViewStyle, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
};

function Screen({ children, style, scrollable }: Props) {
  return (
    <SafeAreaView edges={["top"]} style={[styles.container, style]}>
      <StatusBar style="auto" />
      {scrollable ? (
        <ScrollView
          bounces={false}
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
