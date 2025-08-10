import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../../model/HR/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HrService } from '../../service/HR/hr-service';
import { Router } from '@angular/router';
import { AttendStatus } from '../../../model/HR/atten_status.model';
import { Attendance } from '../../../model/HR/attendance.model';

@Component({
  selector: 'app-add-attendance',
  standalone: false,
  templateUrl: './add-attendance.html',
  styleUrl: './add-attendance.css'
})
export class AddAttendance implements OnInit{

  employee: Employee[] = [];
  status: AttendStatus[]= [];

  formGroup!: FormGroup;

  constructor(
    private hrService: HrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      
    attDate:  [new Date().toISOString().substring(0, 10)],  // current date neyar jnno ei code ti 
      // attDate:[''],
      atten_status: this.formBuilder.group({
        status : [''],
      }),
      employees : this.formBuilder.group({

        id :[''],
        name:[''],
        // ekhane ki employee table er ba employee db json er sob field neya best practice ?? 
      })
    })

    this.loadEmployee();
    this.loadAttenStatus();

    this.formGroup.get('employees')?.get('id')?.valueChanges.subscribe(id => {
    const selectedEmployee = this.employee.find(emp => emp.id === id);
    if(selectedEmployee) {

      this.formGroup.patchValue({employees: selectedEmployee});
    }
   });

   this.formGroup.get('atten_status')?.get('status')?.valueChanges.subscribe(status => {
    const selectedStatus= this.status.find(s => s.status === status);
    if(selectedStatus) {

      this.formGroup.patchValue({atten_status: selectedStatus});
    }
   });


  }


   addAtten(): void {

const atten : Attendance = {...this.formGroup.value};
this.hrService.saveAttendance(atten).subscribe({

  next: (attendance) => {
    console.log(attendance,'Attendance Successfully ! ');
    this.loadEmployee();
    this.loadAttenStatus();
    this.formGroup.reset();
    this.router.navigate(['/viewAllAtten']);
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

  loadAttenStatus(): void {

    this.hrService.getAllAttendStatus().subscribe({

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
