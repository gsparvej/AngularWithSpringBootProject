import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model/HR/department.model';
import { Item } from '../../../model/Purchase/item.model';
import { Order } from '../../../model/Merchandiser/order.model';
import { PurchaseStatus } from '../../../model/Purchase/PRstatus.model';
import { RequisitionService } from '../../service/Purchase/requisition-service';
import { Router } from '@angular/router';
import { HrService } from '../../service/HR/hr-service';
import { MerchandiserService } from '../../service/Merchandiser/merchandiser-service';
import { ItemService } from '../../service/Purchase/item-service';
import { PurchaseRequisition } from '../../../model/Purchase/requisition.model';

@Component({
  selector: 'app-create-requisition',
  standalone: false,
  templateUrl: './create-requisition.html',
  styleUrl: './create-requisition.css'
})
export class CreateRequisition implements OnInit{


  formPR!: FormGroup;                  
  prDate!: Date;                 
  requestedBy!: string;         
  quantity!: number;            
  approxUnitPrice!: number;     
  totalEstPrice!: number;      

  department: Department[] = [];
  prStatus:PurchaseStatus[]= [];
  item: Item[] = [];
  order: Order[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private requisitionService: RequisitionService,
    private router: Router,
    private departService: HrService,
    private orderService: MerchandiserService,
    private itemService: ItemService,
  


  ) {}

  ngOnInit(): void {
     this.formPR = this.formBuilder.group({
      prDate: ['', Validators.required],
      requestedBy: ['', Validators.required],
      quantity: [ , [Validators.required, Validators.min(1)]],
      approxUnitPrice: [ , [Validators.required, Validators.min(0.01)]],
      totalEstPrice: [{  disabled: true }],
      department: this.formBuilder.group({
        name: ['', Validators.required]
      }),
      item: this.formBuilder.group({
        categoryName: ['', Validators.required]
      }),
      order: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      prStatus: this.formBuilder.group({
        status: ['', Validators.required]
      })
    });


    this.loadDepartment();
    this.loadCategoryName();
    this.loadOrderId();
    this.loadPurchaseStatus();

    this.formPR.get('department.name')?.valueChanges.subscribe(name => {
      const selected = this.department.find(d => d.name === name);
      if (selected) {
        this.formPR.patchValue({ department: selected });
      }
    });

    this.formPR.get('item.categoryName')?.valueChanges.subscribe(catName => {
      const selected = this.item.find(i => i.categoryName === catName);
      if (selected) {
        this.formPR.patchValue({ item: selected });
      }
    });

    this.formPR.get('order.id')?.valueChanges.subscribe(id => {
      const selected = this.order.find(o => o.id === id);
      if (selected) {
        this.formPR.patchValue({ order: selected });
      }
    });

    this.formPR.get('prStatus.status')?.valueChanges.subscribe(status => {
      const selected = this.prStatus.find(s => s.status === status);
      if (selected) {
        this.formPR.patchValue({ prStatus: selected });
      }
    });
  }

  calculateTotalPrice(): void {
    const qty = this.formPR.get('quantity')?.value || 0;
    const unitPrice = this.formPR.get('approxUnitPrice')?.value || 0;
    const total = qty * unitPrice;
    this.formPR.get('totalEstPrice')?.setValue(total);
  }

  addRequision(): void {
    if (this.formPR.invalid) {
      console.log('Form Invalid');
      return;
    }
    const pr: PurchaseRequisition = this.formPR.getRawValue();
    console.log('Submitting PR:', pr);

    this.requisitionService.createPR(pr).subscribe({
      next: savedPR => {
        console.log('PR saved:', savedPR);
        this.formPR.reset();
        this.router.navigate(['']);
      },
      error: err => console.error(err)
    });
  }

  private loadDepartment(): void {
    this.departService.getAllDepartment().subscribe({
      next: data => (this.department = data),
      error: err => console.error(err)
    });
  }

  private loadCategoryName(): void {
    this.itemService.getAllItem().subscribe({
      next: data => (this.item = data),
      error: err => console.error(err)
    });
  }

  private loadOrderId(): void {
    this.orderService.getAllOrder().subscribe({
      next: data => (this.order = data),
      error: err => console.error(err)
    });
  }

  private loadPurchaseStatus(): void {
    this.requisitionService.getAllPRstatus().subscribe({
      next: data => (this.prStatus = data),
      error: err => console.error(err)
    });
  }

}
