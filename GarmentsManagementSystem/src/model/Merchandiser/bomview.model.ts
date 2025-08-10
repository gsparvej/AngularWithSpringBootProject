import { Bom } from "./bom.model";
import { Uom } from "./uom.model";

export class Bomview{

    id!: string;
    serial!: number;
    material!: string;
    element!: string;
    quantity!: number;
    unitPrice!: number;
    totalCost!: number;
    uom !: Uom;
    bom!: Bom;


     constructor(id: string, serial: number,material: string,element: string,quantity:number,unitPrice: number
        ,totalCost: number){
        this.id = id;
        this.serial = serial;
        this.material = material;
        this.element = element;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
        this.uom = this.uom;
        this.bom = this.bom;

    }
}