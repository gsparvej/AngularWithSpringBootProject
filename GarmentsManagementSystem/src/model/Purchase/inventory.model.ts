import { Item } from "./item.model";

export class InventoryModel {
  id!: number;
  quantity!: number;
  item!: Item;

  constructor(quantity: number, item: Item ) {
    this.quantity = quantity;
    this.item = item;
  }


}
