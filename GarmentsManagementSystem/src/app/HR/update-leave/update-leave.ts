import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Leave } from '../../../model/HR/leave.model';
import { Employee } from '../../../model/HR/employee.model';
import { LeaveStatus } from '../../../model/HR/leave_status.model';
import { HrService } from '../../service/HR/hr-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-leave',
  standalone: false,
  templateUrl: './update-leave.html',
  styleUrl: './update-leave.css'
})
export class UpdateLeave implements OnInit{
  id: string ='';
  leave: Leave = new Leave();
  employee: Employee[]=[];
  status: LeaveStatus[]=[];

  constructor(
  private hrService: HrService,
  private router: Router,
  private route: ActivatedRoute,
  private cdr: ChangeDetectorRef
){}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadLeaveById();
    this.loadEmployeeId();
    this.loadLeaveStatus();
  }




   updateLeave() : void {
    this.hrService.updateLeave(this.id, this.leave).subscribe({
      next: (emp) => {
        this.router.navigate(['/viewAllLeave'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

   loadLeaveById(): void {
  this.hrService.getLeaveById(this.id).subscribe(data => {
    this.leave = data;
  });
}

  loadEmployeeId(): void {
  this.hrService.getAllEmployee().subscribe({
    next: (de) =>{
      this.employee = de;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.log(err);
    }
  })
}


 loadLeaveStatus(): void {
  this.hrService.getAllLeaveStatus().subscribe({
    next: (de) =>{
      this.status = de;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.log(err);
    }
  })
}
}
