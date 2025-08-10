import { Bomview } from "./bomview.model";
import { Order } from "./order.model";
import { Uom } from "./uom.model";

export class RawMaterialsModel {

    id?: string;
    totalQuantity!: number;

    order!: Order;
    uom!: Uom;
    bomView!: Bomview
}