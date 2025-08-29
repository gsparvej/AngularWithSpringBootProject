import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductionSummary } from '../../../model/Production/producSummary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionSummaryService {
private baseUrl = environment.apiBaseUrl + '/proSummary';

   constructor(private http: HttpClient) {}

    getProductionSummary(): Observable<ProductionSummary[]> {
    return this.http.get<ProductionSummary[]>(`${this.baseUrl}/production-summary`);
  }
}
