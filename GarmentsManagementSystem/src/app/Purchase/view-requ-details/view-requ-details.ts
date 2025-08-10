import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PurchaseRequisition } from '../../../model/Purchase/requisition.model';
import { RequisitionService } from '../../service/Purchase/requisition-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-requ-details',
  standalone: false,
  templateUrl: './view-requ-details.html',
  styleUrl: './view-requ-details.css'
})
export class ViewRequDetails implements OnInit{

   id!: string;
  requisition!: PurchaseRequisition;

  constructor(
    private requisitionService: RequisitionService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    this.viewPRs();
  }

  viewPRs(): void {
    this.requisitionService.viewPRDetails(this.id).subscribe({
      next: (data) => {
        this.requisition = data;
        console.log('PR data:', data);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading PR details:', error);
      }
    });
  }

}
