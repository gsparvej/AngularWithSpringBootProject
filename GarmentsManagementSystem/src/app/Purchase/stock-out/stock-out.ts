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
inventory: any[] = [];
  formStockOut!: FormGroup;
  selectedItem?: InventoryModel;
  submitted: boolean = false;

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
      transactionDate: [this.getTodayDate(), Validators.required],
    });

    this.loadInventory();
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  loadInventory(): void {
    this.inventoryService.getInventories().subscribe({
      next: (data: InventoryModel[]) => {
        this.inventory = data;
        console.log('Loaded inventory:', this.inventory);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading inventory:', err),
    });
  }

  onItemSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value); // Ensure type match
    this.selectedItem = this.inventory.find((i) => i.id === id);

    if (!this.selectedItem) {
      console.warn('Item not found for ID:', id);
    } else {
      console.log('Selected for Stock Out:', this.selectedItem);
    }
  }

  addStockOut(): void {
    this.submitted = true;

    if (this.formStockOut.invalid || !this.selectedItem) {
      this.formStockOut.markAllAsTouched();
      return;
    }

    const outQty = this.formStockOut.value.quantity;

    if (outQty > this.selectedItem.quantity) {
      alert('Not enough stock!');
      return;
    }

    const stockOut: any = {
      itemId: this.selectedItem!.id, // ✅ Safe non-null assertion
      quantity: outQty,
      transactionDate: this.formStockOut.value.transactionDate
    };

    this.inventoryService.saveStockOut(stockOut).subscribe({
      next: () => {
        const newQty = this.selectedItem!.quantity - outQty;

        const updatedInventory = new InventoryModel(newQty, this.selectedItem!.item);
        updatedInventory.id = this.selectedItem!.id;

        this.inventoryService.updateQuantity(updatedInventory).subscribe(() => {
          this.loadInventory();
          this.formStockOut.reset({ transactionDate: this.getTodayDate() });
          this.selectedItem = undefined;
          this.submitted = false;
          this.router.navigate(['']); // Optional navigation
        });
      },
      error: (err) => console.error('Error on stock out:', err),
    });
  }


}
