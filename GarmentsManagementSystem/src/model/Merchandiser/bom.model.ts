import { Uom } from "./uom.model";

export class Bom{

    id!: string;
    styleCode!: string;
    description!: string;
    
    constructor(id: string, styleCode: string,description: string){
        this.id = id;
        this.styleCode = styleCode;
        this.description = description;

    }
}