import AsyncStorage from "@react-native-async-storage/async-storage";
import { IInventoryResponse, InventoryDb } from "../interfaces/IInventory";
import { IUser } from "../interfaces/IUser";

const authKey = "userObject";

const storeUser = async (user: IUser) => {
  try {
    const temp = JSON.stringify(user);
    await AsyncStorage.setItem(authKey, temp);
  } catch (error) {
    console.log("Couldn't store user", error);
  }
};

const getUser = async () => {
  try {
    const temp = await AsyncStorage.getItem(authKey);
    return temp;
  } catch (error) {
    console.log("Couldn't get user", error);
  }
};

const deleteUser = async () => {
  try {
    await AsyncStorage.removeItem(authKey);
  } catch (error) {
    console.log("Couldn't remove user", error);
  }
};

const storeInventory = async (
  item: InventoryDb,
  uid: string
): Promise<IInventoryResponse> => {
  try {
    await AsyncStorage.setItem(uid, JSON.stringify(item));
    return {
      message: "",
      status: true,
    };
  } catch (error) {
    console.log("Couldn't store inventory", error);
    return {
      message: "Could not store inventory",
      status: false,
    };
  }
};

const getInventory = async (uid: string) => {
  try {
    if (!uid) return "";
    return await AsyncStorage.getItem(uid);
  } catch (error) {
    console.log("could not fetch inventory", error);
  }
};

const cacheUid = async (uid: string) => {};

export default {
  storeUser,
  getUser,
  deleteUser,
  storeInventory,
  getInventory,
};
