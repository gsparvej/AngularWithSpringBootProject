import { Employee } from "./employee.model";
import { LeaveStatus } from "./leave_status.model";

export class Leave {

    id !: string;
    leaveType !: string;
    fromDate !: string;
    toDate !: string;
    status !: LeaveStatus;
    employee! : Employee;
    
    // constructor(id: string, leaveType: string, fromDate: string, toDate: string,status: LeaveStatus , employee: Employee){

    //     this.id = id;
    //     this.leaveType = leaveType;
    //     this.fromDate = fromDate;
    //     this.toDate = toDate;
    //     this.status = status;
    //     this.employee = employee;
    // }



}