import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model/HR/department.model';
import { HrService } from '../../service/HR/hr-service';
import { Router } from '@angular/router';
import { Employee } from '../../../model/HR/employee.model';
import { Designation } from '../../../model/HR/designation.model';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee implements OnInit{

  allDepartments: Department[] = [];
  allDesignations: Designation[] = [];  // Filtered Designations

  filteredDesignations: Designation[] = [];
  formGroup!: FormGroup;

  constructor(
    private hrService: HrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { 
    this.formGroup = formBuilder.group({
       name: ['',Validators.required],
       phoneNumber :['',Validators.required],
       email : ['', [Validators.required, Validators.email]],
       joinDate : ['', Validators.required,],
       department: ['', Validators.required],
       designation: ['', Validators.required]
      


    });
  }

  ngOnInit(): void {
     this.hrService.getAllDepartment().subscribe(data => this.allDepartments = data);
     this.hrService.getAllDesignation().subscribe(data => this.allDesignations = data);

  }

  onDepartmentChange(){
    const selectedDepartId = this.formGroup.value.department;
    const selectedDepartment = this.allDepartments.find(d => d.id == selectedDepartId);
    this.cdr.detectChanges();
    if(selectedDepartment){
      this.filteredDesignations = this.allDesignations.filter(desig => selectedDepartment.designations.includes(desig.id!));
      this.formGroup.patchValue({designation: ''});


    }
  }
  onSubmit(){
    if ( this.formGroup.invalid) return;

    const employee = this.formGroup.value;

    this.hrService.saveEmployee(employee).subscribe(() =>{
      alert('Employee Saved Successfully!');
      this.formGroup.reset();
      this.filteredDesignations = [];
      this.router.navigate(['/viewAllEmp']);
    });
  }


//   loadDepartment(): void {

//     this.hrService.getAllDepartment().subscribe({

//       next: (dep) => {
//         this.departments = dep;

//       },
//       error: (err) => {

//         console.log(err);
//       }

//     });

//   }

//   loadDesignation(): void {

//     this.hrService.getAllDesignation().subscribe({

//       next: (dep) => {
//         this.designations = dep;

//       },
//       error: (err) => {

//         console.log(err);
//       }

//     });

//   }

//   addEmp(): void {

// const emp : Employee = {...this.formGroup.value};
// this.hrService.saveEmployee(emp).subscribe({

//   next: (employee) => {
//     console.log(employee,'added Successfully ! ');
//     this.loadDepartment();
//     this.loadDesignation();
//     this.formGroup.reset();
//     this.router.navigate(['/viewAllEmp']);
//   },
//   error: (err) => {
//     console.log(err);
//   }


// })


//   }
}

