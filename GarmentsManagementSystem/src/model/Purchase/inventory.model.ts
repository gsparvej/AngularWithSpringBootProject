export class InventoryModel {
  id!: string;
  quantity!: number;
  categoryName!: string;

  constructor(quantity: number, categoryName: string){
    this.quantity = quantity;
    this.categoryName = categoryName;
  }
}
