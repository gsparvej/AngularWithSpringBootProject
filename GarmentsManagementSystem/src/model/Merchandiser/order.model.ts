import { Bom } from "./bom.model";
import { OrderStatus } from "./orderStatus.model";

export class Order{

    id?: string;
    buyerOrganization!: string;
    shippingAddress!: string;
    orderDate!: Date;
    deliveryDate!: Date;
    smallSize!: number;
    sPrice!: number;
    mediumSize!: number;
    mPrice!: number;
    largeSize!: number;
    lPrice!: number;
    subTotal!:number;
    vat!: number;
    paidAmount!: number;
    dueAmount!: number;
    total!: number;
    remarks!: string;
    orderStatus!: OrderStatus;
    bom!: Bom

   

}