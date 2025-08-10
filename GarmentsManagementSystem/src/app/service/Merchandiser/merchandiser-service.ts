import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Buyer } from '../../../model/Merchandiser/buyer.model';
import { Uom } from '../../../model/Merchandiser/uom.model';
import { Bom } from '../../../model/Merchandiser/bom.model';
import { Bomview } from '../../../model/Merchandiser/bomview.model';
import { Order } from '../../../model/Merchandiser/order.model';
import { RawMaterialsModel } from '../../../model/Merchandiser/raw.model';

@Injectable({
  providedIn: 'root'
})
export class MerchandiserService {

   baseUrlBuyer: string = "http://localhost:3000/buyer";
   baseUrlUOM: string = "http://localhost:3000/uom";
   baseUrlBomView: string = "http://localhost:3000/bomview";
   baseUrlBom: string = "http://localhost:3000/bom";
   baseUrlOrder: string = "http://localhost:3000/order";
   baseUrlOrderStatus: string = "http://localhost:3000/orderStatus";
   baseUrlRawMaterials: string ="http://localhost:3000/rawMaterials";


  constructor(private http: HttpClient) { }


  // buyer add, update, delete ,view start
  getAllBuyer(): Observable<any>{
  
      return this.http.get(this.baseUrlBuyer);
  
    }
  
 saveBuyer(buy: Buyer) : Observable<any> {
    
  return this.http.post(this.baseUrlBuyer,buy);
  }



  getBuyerById(id: string): Observable<any> {
  
      return this.http.get(this.baseUrlBuyer+'/'+id);
    }
    updateBuyer(id: string, buy: Buyer): Observable<any> {
  
     return this.http.put(this.baseUrlBuyer+'/'+id,buy);
    }



  // buyer add, update, delete ,view end 

  // UOM add, update , delete , view start

  getAllUom(): Observable<any>{
  
    return this.http.get(this.baseUrlUOM);
  }

 saveUom(uom: Uom) : Observable<any> {
    
    return this.http.post(this.baseUrlUOM,uom);
 }
 deleteUom(id: string): Observable<any> {

    return this.http.delete(this.baseUrlUOM+'/'+id);
  }

   getUomById(id: string): Observable<any> {

    return this.http.get(this.baseUrlUOM+'/'+id);
  }
   updateManagement(id: string, uom: Uom): Observable<any> {
  
     return this.http.put(this.baseUrlUOM+'/'+id,uom);
    }


  // UOM add, update , delete , view end



   // BOM add, update , delete , view start

  getAllBom(): Observable<any>{
  
    return this.http.get(this.baseUrlBom);
  }

  saveBom(bom: Bom) : Observable<any> {
    
    return this.http.post(this.baseUrlBom,bom);
 }

 // BOM add, update , delete , view end

// BOMBOMVIEW add, update , delete , view start

 getAllBomView(): Observable<any>{
  
    return this.http.get(this.baseUrlBomView);
  }

  saveBomView(bomview: Bomview) : Observable<any> {
    
    return this.http.post(this.baseUrlBomView,bomview);
 }

 getBomByStyle(styleCode: string): Observable<any>{
  return this.http.get(this.baseUrlBomView + "?bom.styleCode=" + styleCode);
 }

 // BOMBOMVIEW add, update , delete , view end

 // Order add, update, delete, view start


 getAllOrder(): Observable<any> {
  return this.http.get(this.baseUrlOrder);
 }
 saveOder(order: Order): Observable<any> {
  return this.http.post(this.baseUrlOrder, order);
 }



  // Order add, update, delete, view end
getAllOrderStatus(): Observable<any> {
  return this.http.get(this.baseUrlOrderStatus);
}

   // OrderStatus add, update, delete, view start



   // OrderStatus add, update, delete, view end


    viewFullOrder(id: string): Observable<any> {
    return this.http.get(this.baseUrlOrder+'/'+id);
  }

  // raw materials /////////////////

  
 getAllRawMaterials(): Observable<any> {
  return this.http.get(this.baseUrlRawMaterials);
 }
 saveRawMaterials(raw: RawMaterialsModel): Observable<any> {
  return this.http.post(this.baseUrlRawMaterials, raw);
 }

}
