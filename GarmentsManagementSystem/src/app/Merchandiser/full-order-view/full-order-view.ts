import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../model/Merchandiser/order.model';
import { BomStyle } from '../../../model/Merchandiser/bom.model';
import { MerchandiserService } from '../../service/Merchandiser/merchandiser-service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Buyer } from '../../../model/Merchandiser/buyer.model';
import { FullOrderViewResponseDTO } from '../../../model/orderResponseDTO';

@Component({
  selector: 'app-full-order-view',
  standalone: false,
  templateUrl: './full-order-view.html',
  styleUrl: './full-order-view.css'
})
export class FullOrderView implements OnInit {

  id: number = 0;
  order!: FullOrderViewResponseDTO;  // 👈 single object, not array

  constructor(
    private merchandiserService: MerchandiserService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    console.log("++++++++++++++++++++++++++");
    this.viewOrder();
  }

  viewOrder(): void {
    this.merchandiserService.getFullOrderById(this.id).subscribe({
      next: (data) => {
        this.order = data;  // 👈 assign object
        console.log("Full Order:", data);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'confirmed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }
}
