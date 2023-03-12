export interface IInventories {
  id: string;
  price: string;
  name: string;
  description: string;
  totalStock: string;
  themeColor?: string;
}

export interface InventoryDb {
  inventoryItems: IInventories[];
}

export interface IInventoryResponse {
  status: boolean;
  message: string;
}
