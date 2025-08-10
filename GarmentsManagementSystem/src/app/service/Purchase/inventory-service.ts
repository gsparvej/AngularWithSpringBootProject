import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInModel } from '../../../model/Purchase/stockIn.model';
import { InventoryModel } from '../../../model/Purchase/inventory.model';
import { StockOutModel } from '../../../model/Purchase/stockOut.model';



@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrlInventory: string = "http://localhost:3000/inventories";
  baseUrlStockIn: string = "http://localhost:3000/stokIn";

  constructor(private http: HttpClient) { }




  // getAllInventory(): Observable<any> {

  //   return this.http.get(this.baseUrlInventory);

  // }

  // saveInventory(inevn: InventoryModel): Observable<any> {

  //   return this.http.post(this.baseUrlInventory, inevn);
  // }



  getAllStockIn(): Observable<any> {

    return this.http.get(this.baseUrlStockIn);

  }

  saveStockIn(stockin: StockInModel): Observable<any> {

    return this.http.post(this.baseUrlStockIn, stockin);
  }

  saveInventories(data: InventoryModel): Observable<InventoryModel> {
    return this.http.post<InventoryModel>(this.baseUrlInventory, data);
  }

  getInventories(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(this.baseUrlInventory);
  }

  deleteInventory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlInventory}/${id}`);
  }

  updateQuantity(id: string, inventory: InventoryModel): Observable<any> {
    return this.http.put(`${this.baseUrlInventory}/${id}`, inventory);
  }

  saveStockOut(stockOut: StockOutModel): Observable<StockOutModel> {
  return this.http.post<StockOutModel>('http://localhost:3000/stockOut', stockOut);
}

getAllStockOut(): Observable<StockOutModel[]> {
  return this.http.get<StockOutModel[]>('http://localhost:3000/stockOut');
}
  
}
