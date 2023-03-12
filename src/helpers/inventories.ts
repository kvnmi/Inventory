import storage from "../Auth/storage";
import colors from "../components/colors";
import {
  IInventories,
  IInventoryResponse,
  InventoryDb,
} from "../interfaces/IInventory";

const emptyInventory: InventoryDb = {
  inventoryItems: [],
};

export async function getAllInventory(uid: string): Promise<InventoryDb> {
  const items = await storage.getInventory(uid);
  if (!items) return emptyInventory;
  return JSON.parse(items);
}

export async function storeInventoryItem(
  inventory: IInventories,
  uid: string
): Promise<IInventoryResponse> {
  const items = await getAllInventory(uid);
  const alreadyExists = findInventoryByName(items, inventory);
  if (alreadyExists) {
    return {
      message: "Item name must be unique",
      status: false,
    };
  } else {
    inventory.id = (items.inventoryItems.length + 1).toString();
    inventory.themeColor = getColor();
    items.inventoryItems.push(inventory);
    return storage.storeInventory(items, uid);
  }
}

function findInventoryByName(items: InventoryDb, item: IInventories): boolean {
  let returnValue = false;
  items.inventoryItems.forEach((_item) => {
    if (_item.name.trim() == item.name.trim()) {
      returnValue = true;
    }
  });

  return returnValue;
}

function getColor(): string {
  const _color: string[] = Object.values(colors);
  return _color[Math.floor(Math.random() * _color.length)];
}

export async function deleteInventoryItem(
  id: string,
  uid: string
): Promise<IInventoryResponse> {
  const items = await getAllInventory(uid);
  const index = items.inventoryItems.findIndex((i) => i.id == id);
  items.inventoryItems.splice(index, 1);

  return storage.storeInventory(items, uid);
}

export async function editInventory(
  inventory: IInventories,
  uid: string
): Promise<IInventoryResponse> {
  const items = await getAllInventory(uid);
  const index = items.inventoryItems.findIndex((i) => i.id == inventory.id);
  if (items.inventoryItems[index].name != inventory.name) {
    if (findInventoryByName(items, inventory)) {
      return {
        message: "Name is already assigned to another item",
        status: false,
      };
    }
  }
  items.inventoryItems[index] = inventory;
  return storage.storeInventory(items, uid);
}
