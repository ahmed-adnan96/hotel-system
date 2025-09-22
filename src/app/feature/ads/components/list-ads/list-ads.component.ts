import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditAdsComponent } from '../add-edit-ads/add-edit-ads.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IAd } from '../../interfaces/IAds';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewAdsComponent } from '../view-ads/view-ads.component';
import { AdsService } from '../../Services/ads.service';
import { DeleteComponent } from '../../../../shared/components/delete/delete.component';

@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrl: './list-ads.component.scss',
  standalone: false
})
export class ListAdsComponent implements OnInit{
  AdsList: IAd[] = [];
  searchText: string = ''
  displayedColumns: string[] = ['roomNumber', 'price', 'discount', 'capacity', 'isActive', 'Action'];
  dataSource!: MatTableDataSource<IAd>;
  totalCount = 0;
  pageSize = 5;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort

  constructor(
    private _adsService: AdsService,
    private dialog: MatDialog,
    private _ToastrService: ToastrService,
  ) { }


  ngOnInit(): void {
    this.getAllAds();
  }

  getAllAds() {
    this._adsService.getAllAds().subscribe({
      next: (res) => {
        this.AdsList = res.data.ads
        this.totalCount = res.data.totalCount;
        this.dataSource = new MatTableDataSource<IAd>(this.AdsList);
        this.dataSource.filterPredicate = (data: IAd, filter: string) => {
          const dataStr = `
            ${data.room?.roomNumber}
            ${data.room?.price}
            ${data.room?.capacity}
            ${data.room?.discount}
            ${data.isActive ? 'yes' : 'no'}
          `.toLowerCase();

          return dataStr.includes(filter.trim().toLowerCase());
        };
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          switch (property) {
            case 'roomNumber': return item.room.roomNumber;
            case 'price': return item.room.price;
            case 'capacity': return item.room.capacity;
            case 'discount': return item.room.discount;
            default: return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.Sort;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // open Dialog Delete
  openDialogDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      minHeight: '300px',
      data: { name: name, id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteAds(id);
      }
    })
  }

  //delete Ads
  DeleteAds(id: number) {
    this._adsService.deleteAds(id).subscribe({
      next: (res) => {
      },
      complete: () => {
        this._ToastrService.success('Deleted Ad successfully');
        this.getAllAds()
      }
    });
  }


  openDialogView(data: IAd) {
    const dialogRef = this.dialog.open(ViewAdsComponent, {
      width: '400px',
      minHeight: '300px',
      data: data,
    });
  }



  openDialog() {
    this.dialog.open(AddEditAdsComponent, {
      data: {
        height : '80vh',
        width : '70vh'
      },
    });
  }

  openEditDialog(id:any) {
    const dialogRef =  this.dialog.open(AddEditAdsComponent, {
      data: {
        _id : id,
        height : '80vh',
        width : '70vh'
      },
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getAllAds()
      }
    })
  }
}
