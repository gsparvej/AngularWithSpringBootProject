import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../service/Purchase/inventory-service';


@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {

  inventoryForm!: FormGroup;
  inventories!: any;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe((data) => {
      this.inventories = data;
      this.cdr.detectChanges();
    });
  }
}
