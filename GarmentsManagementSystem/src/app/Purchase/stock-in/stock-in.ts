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

  inventory: InventoryModel[] = [];
  formStockIn!: FormGroup;
  selectedItem!: InventoryModel | undefined;

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formStockIn = this.formBuilder.group({
      itemId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      receivedTransactionDate: [this.getTodayDate(), Validators.required]
    });

    this.loadInventory();
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  addStockIn(): void {
    if (this.formStockIn.invalid) {
      this.formStockIn.markAllAsTouched();
      return;
    }

    const stock: StockInModel = this.formStockIn.value;

    this.inventoryService.saveStockIn(stock).subscribe({
      next: () => {
        const id = stock.itemId;
        const quantity = Number(stock.quantity) + (this.selectedItem?.quantity || 0);
        const categoryName = this.selectedItem?.categoryName || '';

        const updatedInventory = new InventoryModel(quantity, categoryName);
        this.inventoryService.updateQuantity(id, updatedInventory).subscribe(() => {
          this.loadInventory();
          this.formStockIn.reset({ receivedTransactionDate: this.getTodayDate() });
          this.router.navigate(['']); // Optional: redirect
        });
      },
      error: (err) => {
        console.error('Error adding stock:', err);
      }
    });
  }

  loadInventory(): void {
    this.inventoryService.getInventories().subscribe({
      next: (data) => {
        this.inventory = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading inventory:', err)
    });
  }

  onItemSelect(event: any): void {
    const selectedId = event.target.value;
    this.selectedItem = this.inventory.find(i => i.id === selectedId);
    console.log('Selected Item:', this.selectedItem);
  }

}
