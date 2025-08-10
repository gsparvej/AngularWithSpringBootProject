import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VendorModel } from '../../../model/Purchase/vendor.model';
import { Item } from '../../../model/Purchase/item.model';
import { PoService } from '../../service/Purchase/po-service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrder } from '../../../model/Purchase/po.model';

@Component({
  selector: 'app-view-podetails',
  standalone: false,
  templateUrl: './view-podetails.html',
  styleUrl: './view-podetails.css'
})
export class ViewPODetails implements OnInit{

  id!: string;
  po!: PurchaseOrder;

  constructor(
    private poService: PoService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    this.viewPOs();
  }

   viewPOs(): void {
    this.poService.viewPODetails(this.id).subscribe({
      next: (data) => {
        this.po = data;
        console.log(data);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
