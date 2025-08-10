import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Uom } from '../../../model/Merchandiser/uom.model';
import { Order } from '../../../model/Merchandiser/order.model';
import { Bomview } from '../../../model/Merchandiser/bomview.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MerchandiserService } from '../../service/Merchandiser/merchandiser-service';
import { Router } from '@angular/router';
import { RawMaterialsModel } from '../../../model/Merchandiser/raw.model';

@Component({
  selector: 'app-raw-materials-calc',
  standalone: false,
  templateUrl: './raw-materials-calc.html',
  styleUrl: './raw-materials-calc.css'
})
export class RawMaterialsCalc implements OnInit {

  order: Order[] = [];
  uom: Uom[] = [];
  bomView: Bomview[] = [];

  formRawMaterials!: FormGroup;

  constructor(
    private merchandiserService: MerchandiserService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formRawMaterials = this.fb.group({
      order: this.fb.group({
        id: [''],
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
        fullXLPrice: [''],
      }),
      uom: this.fb.group({
        id: [''],
        productName: [''],
        size: [''],
        result: ['']
      }),
      bomView: this.fb.group({
        id: [''],
        material: [''],
        quantity: ['']
      })
    });

    this.loadOrder();
    this.loadUom();
    this.loadAllBomView();

    this.formRawMaterials.get('order.id')?.valueChanges.subscribe(id => {
      const selected = this.order.find(or => or.id === id);
      if (selected) {
        this.formRawMaterials.patchValue({ order: selected });
      }
    });


    this.formRawMaterials.get('uom.id')?.valueChanges.subscribe(id => {
      const selected = this.uom.find(uom => uom.id === id);
      if (selected) {
        this.formRawMaterials.patchValue({ uom: selected });
      }
    });

    this.formRawMaterials.get('bomView.id')?.valueChanges.subscribe(id => {
      const selected = this.bomView.find(bomView => bomView.id === id);
      if (selected) {
        this.formRawMaterials.patchValue({ bomView: selected });
      }
    });

  }



  loadOrder(): void {
    this.merchandiserService.getAllOrder().subscribe({
      next: (res: Order[]) => {
        this.order = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadUom(): void {
    this.merchandiserService.getAllUom().subscribe({
      next: res => {
        this.uom = res;
        this.cdr.markForCheck();
      },
      error: err => {
        console.log(err);
      }
    });
  }


  loadAllBomView(): void {
    this.merchandiserService.getAllBomView().subscribe({
      next: res => {
        this.bomView = res;
        this.cdr.markForCheck();
      },
      error: err => {
        console.log(err);
      }
    });
  }


  






}
