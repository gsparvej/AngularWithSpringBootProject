import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../../model/Purchase/item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
baseUrlItem: string = "http://localhost:3000/item";

  constructor(private http: HttpClient) { }

  getAllItem(): Observable<any>{
      
  return this.http.get(this.baseUrlItem);
      
        }
      
  saveItem(item: Item) : Observable<any> {
        
  return this.http.post(this.baseUrlItem,item);
  }
}
