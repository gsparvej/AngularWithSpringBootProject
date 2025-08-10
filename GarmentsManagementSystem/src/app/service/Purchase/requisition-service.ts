import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseRequisition } from '../../../model/Purchase/requisition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

baseUrlRequision: string = "http://localhost:3000/requsition";
baseUrlPRstatus: string = "http://localhost:3000/prStatus";

  constructor(private http: HttpClient) {}

  // Create PR
  createPR(pr: PurchaseRequisition): Observable<any> {
    return this.http.post(this.baseUrlRequision, pr);
  }

    getAllRequisition(): Observable<any>{
      
  return this.http.get(this.baseUrlRequision);
}

viewPRDetails(id: string): Observable<any> {
    return this.http.get(this.baseUrlRequision+'/'+id);
  }

  

   getAllPRstatus(): Observable<any>{
    
        return this.http.get(this.baseUrlPRstatus);
      }




      // // Get All PRs
  // getAllPRs(): Observable<PurchaseRequisition[]> {
  //   return this.http.get<PurchaseRequisition[]>(this.baseUrlRequision);
  // }

  // // Get PR by ID
  // getPRById(id: string): Observable<PurchaseRequisition> {
  //   return this.http.get<PurchaseRequisition>(`${this.baseUrlRequision}/${id}`);
  // }

  // // Update PR
  // updatePR(id: string, pr: PurchaseRequisition): Observable<PurchaseRequisition> {
  //   return this.http.put<PurchaseRequisition>(`${this.baseUrlRequision}/${id}`, pr);
  // }

  // // Delete PR
  // deletePR(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrlRequision}/${id}`);
  // }
}
