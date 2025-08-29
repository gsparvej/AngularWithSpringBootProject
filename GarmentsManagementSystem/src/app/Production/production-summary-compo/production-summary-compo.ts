import { Component, OnInit } from '@angular/core';
import { ProductionSummary } from '../../../model/Production/producSummary.model';
import { ProductionSummaryService } from '../../service/Production/production-summary-service';

@Component({
  selector: 'app-production-summary-compo',
  standalone: false,
  templateUrl: './production-summary-compo.html',
  styleUrl: './production-summary-compo.css'
})
export class ProductionSummaryCompo implements OnInit{

   summaries: ProductionSummary[] = [];

  constructor(private proSummarySer: ProductionSummaryService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.proSummarySer.getProductionSummary().subscribe({
      next: (data) => this.summaries = data,
      error: (err) => console.error('Failed to load summary:', err)
    });
  }
}
