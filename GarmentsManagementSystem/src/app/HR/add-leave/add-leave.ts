import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../../model/HR/employee.model';
import { LeaveStatus } from '../../../model/HR/leave_status.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HrService } from '../../service/HR/hr-service';
import { Router } from '@angular/router';
import { Leave } from '../../../model/HR/leave.model';

@Component({
  selector: 'app-add-leave',
  standalone: false,
  templateUrl: './add-leave.html',
  styleUrl: './add-leave.css'
})
export class AddLeave implements OnInit{

  employee: Employee[] = [];
  status: LeaveStatus[]= [];

  formGroup!: FormGroup;

  constructor(
    private hrService: HrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      leaveType: [''],
      fromDate: [''],
      toDate: [''],

      leave_status: this.formBuilder.group({
        status : [''],
      }),
      employees : this.formBuilder.group({

        id :[''],
        name:[''],

        // ekhane ki employee table er ba employee db json er sob field neya best practice ?? 
      })



    })
    this.loadEmployee();
    this.loadLeaveStatus();


    this.formGroup.get('employees')?.get('id')?.valueChanges.subscribe(id => {
    const selectedEmployee = this.employee.find(emp => emp.id === id);
    if(selectedEmployee) {

      this.formGroup.patchValue({employees: selectedEmployee});
    }
   });




    this.formGroup.get('leave_status')?.get('status')?.valueChanges.subscribe(status => {
    const selectedStatus= this.status.find(s => s.status === status);
    if(selectedStatus) {

      this.formGroup.patchValue({leave_status: selectedStatus});
    }
   });
  }


  addLeave(): void {
  
  const leave : Leave = {...this.formGroup.value};
  this.hrService.saveLeave(leave).subscribe({
  
    next: (leave) => {
      console.log(leave,'Leave Count Successfully ! ');
      this.loadEmployee();
      this.loadLeaveStatus();
      this.formGroup.reset();
      this.router.navigate(['/viewAllLeave']);
    },
    error: (err) => {
      console.log(err);
    }
  
  
  })
  
  
    }


  loadEmployee(): void {

    this.hrService.getAllEmployee().subscribe({

      next: (emp) => {
        this.employee = emp;
        this.cdr.detectChanges();

      },
      error: (err) => {

        console.log(err);
      }

    });

  }


   loadLeaveStatus(): void {

    this.hrService.getAllLeaveStatus().subscribe({

      next: (s) => {
        this.status = s;
         this.cdr.detectChanges();

      },
      error: (err) => {

        console.log(err);
      }

    });

  }

}
