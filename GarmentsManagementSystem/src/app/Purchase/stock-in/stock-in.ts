import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { InventoryService } from '../../service/Purchase/inventory-service';
import { ItemService } from '../../service/Purchase/item-service';
import { InventoryModel } from '../../../model/Purchase/inventory.model';
import { StockInModel } from '../../../model/Purchase/stockIn.model';

@Component({
  selector: 'app-stock-in',
  standalone: false,
  templateUrl: './stock-in.html',
  styleUrl: './stock-in.css'
})

export class StockIn implements OnInit {
  formStockIn!: FormGroup;
  inventories: any[] = [];
  selectedItem!: InventoryModel | undefined;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formStockIn = this.fb.group({
      itemId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      transactionDate: [this.getTodayDate(), Validators.required],
    });

    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe({
      next: (data) => {
        this.inventories = data;
        console.log(this.inventories)
      },
      error: (err) => console.error('Error loading inventories:', err),
    });
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  onItemSelect(event: any): void {
    const selectedId = event.target.value;
    this.selectedItem = this.inventories.find(i => i.id === selectedId);
  }

  addStockIn(): void {
    if (this.formStockIn.invalid) {
      return;
    }

    const stockIn: StockInModel = this.formStockIn.value;

    this.inventoryService.saveStockIn(stockIn).subscribe({
      next: () => {
        const id = stockIn.itemId;
        const quantity = Number(stockIn.quantity) + (this.selectedItem?.quantity || 0);

        // Fix: Correct the item reference when creating InventoryModel
        const updatedInventory = new InventoryModel(quantity, this.selectedItem?.item!);

        this.inventoryService.updateQuantity(updatedInventory).subscribe(() => {
          this.loadInventories();
          this.formStockIn.reset();
        });
      },
      error: (err) => console.error('Error adding stock:', err),
    });
  }


}
