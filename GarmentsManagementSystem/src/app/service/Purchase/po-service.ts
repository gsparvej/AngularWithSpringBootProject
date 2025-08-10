import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../../model/Purchase/po.model';

@Injectable({
  providedIn: 'root'
})
export class PoService {
baseUrlPO: string = "http://localhost:3000/po";
  constructor(private http: HttpClient) { }


  getAllPO(): Observable<any>{
      
  return this.http.get(this.baseUrlPO);
}
      
  savePO(po: PurchaseOrder) : Observable<any> {
        
  return this.http.post(this.baseUrlPO,po);
  }

   viewPODetails(id: string): Observable<any> {
    return this.http.get(this.baseUrlPO+'/'+id);
  }
}
