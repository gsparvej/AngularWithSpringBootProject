import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../service/Purchase/inventory-service';
import { ItemService } from '../../service/Purchase/item-service';
import { Router } from '@angular/router';
import { InventoryModel } from '../../../model/Purchase/inventory.model';
import { StockOutModel } from '../../../model/Purchase/stockOut.model';

@Component({
  selector: 'app-stock-out',
  standalone: false,
  templateUrl: './stock-out.html',
  styleUrl: './stock-out.css'
})
export class StockOut implements OnInit {


  inventory: InventoryModel[] = [];
  formStockOut!: FormGroup;
  selectedItem!: InventoryModel | undefined;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formStockOut = this.fb.group({
      itemId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      transactionDate: [this.getTodayDate(), Validators.required]
    });

    this.loadInventory();
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
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
    const id = event.target.value;
    this.selectedItem = this.inventory.find(i => i.id === id);
    console.log('Selected for Stock Out:', this.selectedItem);
  }

  addStockOut(): void {
    if (this.formStockOut.invalid || !this.selectedItem) {
      this.formStockOut.markAllAsTouched();
      return;
    }

    const outQty = this.formStockOut.value.quantity;
    if (outQty > this.selectedItem.quantity) {
      alert('Not enough stock!');
      return;
    }

    const stockOut: StockOutModel = this.formStockOut.value;

    this.inventoryService.saveStockOut(stockOut).subscribe({
      next: () => {
        const newQty = this.selectedItem!.quantity - outQty;
        const updatedInventory = new InventoryModel(newQty, this.selectedItem!.categoryName);
        this.inventoryService.updateQuantity(this.selectedItem?.id!, updatedInventory).subscribe(() => {
          this.loadInventory();
          this.formStockOut.reset({ transactionDate: this.getTodayDate() });
          this.router.navigate(['']); // Optional
        });
      },
      error: (err) => console.error('Error on stock out:', err)
    });
  }


}
