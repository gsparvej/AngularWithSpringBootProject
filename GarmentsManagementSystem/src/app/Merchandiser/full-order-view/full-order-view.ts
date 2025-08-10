import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../model/Merchandiser/order.model';
import { Bom } from '../../../model/Merchandiser/bom.model';
import { MerchandiserService } from '../../service/Merchandiser/merchandiser-service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-full-order-view',
  standalone: false,
  templateUrl: './full-order-view.html',
  styleUrl: './full-order-view.css'
})
export class FullOrderView implements OnInit{

 id!: string;
  order! : Order;

  orders: Order[ ] = [];
  boms: Bom[] = [];

  constructor(
    private merchandiserService: MerchandiserService,

    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
   this.viewOrder();
   
  }

  viewOrder(): void {
    this.merchandiserService.viewFullOrder(this.id).subscribe({
      next: (data) => {
        this.order = data;
        console.log(data);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'up coming':
        return 'bg-primary';
      case 'under construction':
        return 'bg-warning';
      case 'completed':
        return 'bg-success';
      default:
        return 'bg-danger';
    }
  }
}
