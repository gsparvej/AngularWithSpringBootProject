import { BomStyle } from "../Merchandiser/bom.model";
import { Order } from "../Merchandiser/order.model";

export interface ProductionOrder {
  id?: number;
  planQty: number;
  startDate: Date;
  endDate: Date;
  priority: 'Urgent' | 'Normal' | 'Low';
  status: 'Planned' | 'Running' | 'Completed';

  bomStyle?: BomStyle;   
  order?: Order;         
  
}