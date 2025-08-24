import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductionOrder } from '../../../model/Production/productionOrder.model';
import { ProductionOrderService } from '../../service/Production/production-order-service';

@Component({
  selector: 'app-production-order-list',
  standalone: false,
  templateUrl: './production-order-list.html',
  styleUrl: './production-order-list.css'
})
export class ProductionOrderList implements OnInit{

  productionOrders: ProductionOrder[] = [];

  constructor(
    private productionOrderService: ProductionOrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.productionOrderService.getAllProductionOrder().subscribe({
      next: (orders) => {
        this.productionOrders = orders;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.productionOrderService.deleteProductionOrder(id).subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
