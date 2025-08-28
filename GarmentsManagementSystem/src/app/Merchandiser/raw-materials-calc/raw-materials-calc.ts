import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Uom } from '../../../model/Merchandiser/uom.model';
import { Order } from '../../../model/Merchandiser/order.model';
import { Bomview } from '../../../model/Merchandiser/bomview.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MerchandiserService } from '../../service/Merchandiser/merchandiser-service';
import { Router } from '@angular/router';
import { RawMaterialsModel } from '../../../model/Merchandiser/raw.model';
import { error } from 'node:console';

@Component({
  selector: 'app-raw-materials-calc',
  standalone: false,
  templateUrl: './raw-materials-calc.html',
  styleUrl: './raw-materials-calc.css'
})
export class RawMaterialsCalc implements OnInit {

  fullOrder: any;

  order: Order[] = [];
  uom: Uom[] = [];
  formRawMaterials!: FormGroup;

  constructor(
    private merchandiserService: MerchandiserService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formRawMaterials = this.fb.group({
      selectedStyle: [''],  // dropdown at root
      order: this.fb.group({
        shortSmallSize: [''],
        shortSPrice: [''],
        shortMediumSize: [''],
        shortMPrice: [''],
        shortLargeSize: [''],
        shortLPrice: [''],
        shortXLSize: [''],
        shortXLPrice: [''],

        fullSmallSize: [''],
        fullSPrice: [''],
        fullMediumSize: [''],
        fullMPrice: [''],
        fullLargeSize: [''],
        fullLPrice: [''],
        fullXLSize: [''],
        fullXLPrice: ['']
      }),



      uoms: this.fb.array([]) // 8 UOM rows
    });

    this.loadOrder();
    this.loadUom();

    // Initialize 8 UOM rows
    for (let i = 0; i < 8; i++) {
      this.addUomRow();
    }
  }

  // --- Load Orders ---
  loadOrder(): void {
    this.merchandiserService.getAllOrder().subscribe({
      next: (res: Order[]) => {
        this.order = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // --- Load UOMs ---
  loadUom(): void {
    this.merchandiserService.getAllUom().subscribe({
      next: res => {
        this.uom = res;
        this.cdr.detectChanges();
      },
      error: err => console.log(err)
    });
  }

  // --- On Style Change ---
  onStyleChange() {



    console.log(this.formRawMaterials.get('selectedStyle')?.value);

    const styleCode = this.formRawMaterials.get('selectedStyle')?.value;

    this.merchandiserService.getOrderByStyle(styleCode).subscribe({

      next: (data) => {
        this.fullOrder = data[0]; // Take the first order from array
        this.patchOrderForm(this.fullOrder);
        console.log(this.fullOrder);

      },

      error: error => {
        console.log(error);

      }


    });


    if (!styleCode) return;




    if (this.fullOrder) {
      this.formRawMaterials.get('order')?.patchValue({
        shortSmallSize: this.fullOrder.shortSmallSize,
        shortSPrice: this.fullOrder.shortSPrice,
        shortMediumSize: this.fullOrder.shortMediumSize,
        shortMPrice: this.fullOrder.shortMPrice,
        shortLargeSize: this.fullOrder.shortLargeSize,
        shortLPrice: this.fullOrder.shortLPrice,
        shortXLSize: this.fullOrder.shortXLSize,
        shortXLPrice: this.fullOrder.shortXLPrice,

        fullSmallSize: this.fullOrder.fullSmallSize,
        fullSPrice: this.fullOrder.fullSPrice,
        fullMediumSize: this.fullOrder.fullMediumSize,
        fullMPrice: this.fullOrder.fullMPrice,
        fullLargeSize: this.fullOrder.fullLargeSize,
        fullLPrice: this.fullOrder.fullLPrice,
        fullXLSize: this.fullOrder.fullXLSize,
        fullXLPrice: this.fullOrder.fullXLPrice
      });
    }
  }

  // --- UOM Helper Functions ---
  createUomRow(): FormGroup {
    return this.fb.group({
      id: [''],
      productName: [''],
      size: [''],
      baseFabric: ['']
    });
  }

  addUomRow() {
    const row = this.createUomRow();

    // Auto-fill when UOM id changes
    row.get('id')?.valueChanges.subscribe(id => {
      const selected = this.uom.find(u => u.id === +id);
      if (selected) {
        row.patchValue({
          productName: selected.productName,
          size: selected.size,
          baseFabric: selected.baseFabric
        }, { emitEvent: false });
      } else {
        row.patchValue({ productName: '', size: '', baseFabric: '' }, { emitEvent: false });
      }
    });

    (this.formRawMaterials.get('uoms') as FormArray).push(row);
  }

  get uomsFormArray(): FormArray {
    return this.formRawMaterials.get('uoms') as FormArray;
  }

  saveRawMaterials() {
    console.log(this.formRawMaterials.value);
    // Call API to save data here
  }



  patchOrderForm(orderData: any) {
    this.formRawMaterials.get('order')?.patchValue({
      shortSmallSize: orderData.shortSmallSize,
      shortMediumSize: orderData.shortMediumSize,
      shortLargeSize: orderData.shortLargeSize,
      shortXLSize: orderData.shortXLSize,
      fullSmallSize: orderData.fullSmallSize,
      fullMediumSize: orderData.fullMediumSize,
      fullLargeSize: orderData.fullLargeSize,
      fullXLSize: orderData.fullXLSize
    });
  }



}