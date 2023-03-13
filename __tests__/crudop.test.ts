import AsyncStorage from "@react-native-async-storage/async-storage";
import { cleanup } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import storage from "../src/Auth/storage";

import { deleteInventoryItem, editInventory } from "../src/helpers/inventories";
import { IInventories, InventoryDb } from "../src/interfaces/IInventory";

describe("Async Storage CRUD operations", () => {
  afterEach(async () => {
    cleanup();
    await AsyncStorage.removeItem(key);
  });

  const key = "uid";
  const item: InventoryDb = {
    inventoryItems: [
      {
        description: "test description",
        id: "1",
        name: "test name",
        price: "test price",
        totalStock: "test total stock",
      },
    ],
  };

  it("creates an item", async () => {
    await act(async () => {
      await storage.storeInventory(item, key);
    });

    const savedItem = await AsyncStorage.getItem(key);
    expect(savedItem).toEqual(JSON.stringify(item));
  });

  it("retrieves an item from storage", async () => {
    await AsyncStorage.setItem(key, JSON.stringify(item));
    let retrievedItem: string = "";
    await act(async () => {
      const response = await storage.getInventory(key);
      retrievedItem = response ? JSON.parse(response) : "";
    });
    expect(retrievedItem).toEqual(item);
  });

  it("deletes an item from storage", async () => {
    await AsyncStorage.setItem(key, JSON.stringify(item));

    await act(async () => {
      await deleteInventoryItem("1", key);
    });

    const savedItem = await AsyncStorage.getItem(key);
    const _savedItem: InventoryDb = JSON.parse(savedItem!);
    expect(_savedItem.inventoryItems).toEqual([]);
  });

  it("updates an item in storage", async () => {
    await AsyncStorage.setItem(key, JSON.stringify(item));
    const updatedItem: IInventories = {
      ...item.inventoryItems[0],
      price: "100",
    };
    await act(async () => {
      await editInventory(updatedItem, key);
    });
    const savedItem = await AsyncStorage.getItem(key);
    const _savedItem: InventoryDb = JSON.parse(savedItem!);
    expect(_savedItem.inventoryItems[0]).toEqual(updatedItem);
  });
});
