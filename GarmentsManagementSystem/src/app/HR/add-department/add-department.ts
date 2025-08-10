import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrService } from '../../service/HR/hr-service';
import { Router } from '@angular/router';
import { Department } from '../../../model/HR/department.model';
import { Designation } from '../../../model/HR/designation.model';

@Component({
  selector: 'app-add-department',
  standalone: false,
  templateUrl: './add-department.html',
  styleUrl: './add-department.css'
})
export class AddDepartment implements OnInit{

  departForm !: FormGroup;
  designations: Designation[] = [];

  constructor(
    private hrService: HrService,
    private router : Router,
    private formBuilder : FormBuilder,
    private cdr: ChangeDetectorRef

  ){
    this.departForm = this.formBuilder.group({
      name: ['', Validators.required],
      designations: [[], Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadDesignations();
  }

  loadDesignations(){
    this.hrService.getAllDesignation().subscribe(data => {
      this.designations = data;
      this.cdr.detectChanges();
    });
  }

  onSubmit(){
    if (this.departForm.invalid ) return;
    const department: Department = this.departForm.value;
    this.hrService.saveDepartment(department).subscribe(() => {
      alert('Department Added Successfully!');
      this.departForm.reset();
    });
  }

  // addDepartment(): void {
  //   const department : Department = {...this.departForm.value};
  //   this.hrService.saveDepartment(department).subscribe({
  
  //     next: (res) => {
  
  //       console.log(res,'Added Succesfully');
  //       this.departForm.reset();
  //       this.router.navigate(['/viewAllDepart']);
  
  //     },
  //     error: (err) => {
  //       console.log(err,'Data Not Saved ! Please Check Console')
  
  //     }
  
  
  
  //   });
  
  
  
  //   }

}
