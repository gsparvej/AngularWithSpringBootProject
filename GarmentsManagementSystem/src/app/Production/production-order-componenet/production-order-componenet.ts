import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductionOrderService } from '../../service/Production/production-order-service';
import { ProductionOrder } from '../../../model/Production/productionOrder.model';


@Component({
  selector: 'app-production-order-componenet',
  standalone: false,
  templateUrl: './production-order-componenet.html',
  styleUrl: './production-order-componenet.css'
})
export class ProductionOrderComponenet implements OnInit{

  
  productionOrders: ProductionOrder[] = [];
  productionOrderForm!: FormGroup;
  editingOrder: ProductionOrder | null = null;

  constructor(
    private fb: FormBuilder,
    private productionOrderService: ProductionOrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();

    this.productionOrderForm = this.fb.group({
      planQty: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['Normal', Validators.required],
      status: ['Planned', Validators.required]
    });
  }

  loadOrders(): void {
    this.productionOrderService.getAllProductionOrder().subscribe(data => {
      this.productionOrders = data;
    });
  }

  onSubmit(): void {
    if (this.productionOrderForm.invalid) return;

    const formValue = this.productionOrderForm.value;

    if (this.editingOrder) {
      this.productionOrderService
        .update(this.editingOrder.id!, formValue)
        .subscribe(() => {
          this.loadOrders();
          this.editingOrder = null;
          this.productionOrderForm.reset({ priority: 'Normal', status: 'Planned' });
        });
    } else {
      this.productionOrderService.createProductionOrder(formValue).subscribe(() => {
        this.loadOrders();
        this.productionOrderForm.reset({ priority: 'Normal', status: 'Planned' });
      });
    }
  }

  edit(order: ProductionOrder): void {
    this.editingOrder = order;
    this.productionOrderForm.patchValue(order);
  }

  delete(id: number): void {
    if (confirm('Are you sure to delete this Production Order?')) {
      this.productionOrderService.deleteProductionOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }
}
