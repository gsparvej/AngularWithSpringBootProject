import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../../model/Purchase/po.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoService {
private baseUrlPO = environment.apiBaseUrl + '/po';

  constructor(private http: HttpClient) { }


  getAllPO(): Observable<any>{
      
  return this.http.get(this.baseUrlPO);
}
      
  savePO(po: PurchaseOrder) : Observable<any> {
        
  return this.http.post(this.baseUrlPO,po);
  }

   viewPODetails(id: number): Observable<any> {
    return this.http.get(this.baseUrlPO+'/'+id);
  }
}
