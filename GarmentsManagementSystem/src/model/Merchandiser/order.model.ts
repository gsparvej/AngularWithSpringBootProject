import { Bom } from "./bom.model";
import { OrderStatus } from "./orderStatus.model";

export class Order{

    id?: string;
    buyerOrganization!: string;
    shippingAddress!: string;
    orderDate!: Date;
    deliveryDate!: Date;

    shortSmallSize!: number;
    shortSPrice!: number;
    shortMediumSize!: number;
    shortMPrice!: number;
    shortLargeSize!: number;
    shortLPrice!: number;
    shortXLSize!: number;
    shortXLPrice!: number;


    fullSmallSize!: number;
    fullSPrice!: number;
    fullMediumSize!: number;
    fullMPrice!: number;
    fullLargeSize!: number;
    fullLPrice!: number;
    fullXLSize!: number;
    fullXLPrice!: number;




    subTotal!:number;
    vat!: number;
    paidAmount!: number;
    dueAmount!: number;
    total!: number;
    remarks!: string;
    orderStatus!: OrderStatus;
    bom!: Bom

   

}