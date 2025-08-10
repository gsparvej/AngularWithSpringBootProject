import { Designation } from "./designation.model";

export class Department {

    id !: string;
    name !: string;
    designations: string[];
    
    constructor(id: string,name: string,designations: string[] = []){

        this.id = id;
        this.name = name;
        this.designations = designations;
    }
    
}
