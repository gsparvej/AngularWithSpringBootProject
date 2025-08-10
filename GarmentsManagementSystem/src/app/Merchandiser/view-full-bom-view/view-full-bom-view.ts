import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MerchandiserService } from '../../service/Merchandiser/merchandiser-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-full-bom-view',
  standalone: false,
  templateUrl: './view-full-bom-view.html',
  styleUrl: './view-full-bom-view.css'
})
export class ViewFullBomView implements OnInit {

  styleCode!: string;
  total!: number;
  bomview: any;

  constructor(
    private merchandiserService: MerchandiserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ar: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.styleCode = this.ar.snapshot.params['id'];
    this.viewBomDetails(this.styleCode);
    this.totalHisab(this.styleCode);

  }

  // loadAllBomView(){
  //   this.bomview = this.merchandiserService.getAllBomView();
  // }

  viewBomDetails(styleCode: string) {
    this.bomview = this.merchandiserService.getBomByStyle(styleCode);
  }

  totalHisab(id: string): void {
    this.merchandiserService.getBomByStyle(id).subscribe({
      next: (data) => {
        this.total = data.reduce((sum: number, item: any) => sum + (item.totalCost || 0), 0);
      }
    });
  }

}
