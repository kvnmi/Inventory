import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import Screen from "../components/Screen";
import colors from "../components/colors";
import Card from "../components/Card";
import useAuth from "../Auth/useAuth";

import {
  normalise,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../config/normalise";
import { IInventories } from "../interfaces/IInventory";
import { getAllInventory } from "../helpers/inventories";
import { AppNavScreenProps } from "../Router/navTypes";
import Header from "../components/Header";
import AppButtons from "../components/AppButton";
import AppText from "../components/AppText";

function ListingScreen({ navigation }: AppNavScreenProps<"Home">) {
  const { user } = useAuth();
  const { logOut } = useAuth();
  const [listings, setListings] = useState<IInventories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchListings() {
    setLoading(true);
    const data = await getAllInventory(user!.uid);
    setListings(data.inventoryItems);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchListings();
    });
    return unsubscribe;
  }, [navigation, user]);

  return (
    <Screen style={styles.screen}>
      <Header title="Listings" onPress={logOut} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} color={colors.blue} />
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(m, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: normalise(20),
            paddingHorizontal: pixelSizeHorizontal(15),
            paddingBottom: pixelSizeVertical(10),
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyListings}>
              <AppText>No inventory items saved yet</AppText>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.emptyListings}>
              <AppButtons
                title="Add listing"
                onPress={() => navigation.navigate("CreateListing")}
              />
            </View>
          )}
          renderItem={({ item }) => (
            <Card
              data={item}
              onPress={() => navigation.navigate("EditListing", { item })}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.lightgrey,
  },
  emptyListings: {
    alignItems: "center",
  },
});

export default ListingScreen;
