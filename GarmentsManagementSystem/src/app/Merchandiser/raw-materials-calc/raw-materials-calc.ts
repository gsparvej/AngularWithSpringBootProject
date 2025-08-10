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
  ) {}

  ngOnInit(): void {
    this.formRawMaterials = this.fb.group({
      order: this.fb.group({
        id: [''],
        smallSize: [''],
        mediumSize: [''],
        largeSize: ['']
      }),
      uom: this.fb.array([])  // FormArray for multiple UOM selections
    });

    this.loadOrder();
    this.loadUom();

    // Add one initial UOM selection field by default
    this.addUom();
  }

  // Getter for convenience to access the UOM FormArray
  get uomArray(): FormArray {
    return this.formRawMaterials.get('uom') as FormArray;
  }

  // Add a new UOM FormGroup to the FormArray
  addUom(): void {
    const group = this.fb.group({
      id: [''],        
      size: [''],      
      result: ['0']    
    });

    // Update size and result when id changes
    group.get('id')?.valueChanges.subscribe(id => {
      const selected = this.uom.find(u => u.id === id);
      if (selected) {
        group.patchValue(
          {
            size: selected.size,
            // result: selected.result || '0'
          },
          { emitEvent: false } // prevent infinite loop of valueChanges
        );
      } else {
        group.patchValue({ size: '', result: '0' }, { emitEvent: false });
      }
    });

    this.uomArray.push(group);
  }

  // Remove a UOM FormGroup at given index
  removeUom(index: number): void {
    this.uomArray.removeAt(index);
  }

  // Save the raw materials data
  addRawMaterials(): void {
    // Extract form values
    const formValue = this.formRawMaterials.value;

    // Construct RawMaterialsModel object
    const rawMaterials: RawMaterialsModel = {
      id: undefined,
      totalQuantity: 0,  // Assign properly if you have totalQuantity input or calculate it
      order: formValue.order,
      uom: formValue.uom,       // This is an array now, matching your model
      bomView: this.bomView[0] || {} as Bomview // example - adjust as needed
    };

    this.merchandiserService.saveRawMaterials(rawMaterials).subscribe({
      next: (bomview) => {
        console.log(bomview, 'Raw Materials Saved Successfully!');
        this.loadOrder();
        this.loadUom();
        this.formRawMaterials.reset();
        this.uomArray.clear();    // Clear the UOM form array
        this.addUom();            // Add back an initial blank UOM form group
        this.router.navigate(['']);  // Navigate somewhere, adjust route as needed
      },
      error: (err) => {
        console.error('Save failed:', err);
      }
    });
  }

  loadOrder(): void {
    this.merchandiserService.getAllOrder().subscribe({
      next: (res) => {
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
      next: (res) => {
        this.uom = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
