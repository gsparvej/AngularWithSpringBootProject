import { BomStyle } from "../Merchandiser/bom.model";
import { Order } from "../Merchandiser/order.model";

export interface ProductionOrder {
  id?: number;
  planQty: number;
  startDate: Date;
  endDate: Date;
  priority: 'Urgent' | 'Normal' | 'Low';
  status: 'Planned' | 'Running' | 'Completed';
  description: 'Short Sleeve Shirt' | 'Full Sleeve Shirt';
  size: 'S' | 'M' | 'L' | 'XL' ;

  bomStyle?: BomStyle;   
  order?: Order;         
  
}