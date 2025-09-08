import { FacilitiesService } from './../../services/facilities.service';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Facility } from '../../interfaces/ifacilities';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFacilitiesComponent } from '../add-edit-facilities/add-edit-facilities.component';
import { DeleteComponent } from '../../../shared/components/delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { MatSort, Sort, } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.scss'],
  standalone: false
})
export class FacilitiesListComponent implements OnInit, AfterViewInit {
  facilitiesList: Facility[] = [];
  displayedColumns: string[] = ['name', 'createdBy', 'createdAt', 'action'];
  dataSource: any
  constructor(private _FacilitiesService: FacilitiesService, private dialog: MatDialog, private _ToastrService: ToastrService, private _liveAnnouncer: LiveAnnouncer) { }
  ngOnInit(): void {
    this.getAllFacilities();
  }

  @ViewChild(MatSort) Sort!: MatSort

  ngAfterViewInit() {
    this.dataSource.sort = this.Sort;
  }

  getAllFacilities() {
    console.log('done')
    this._FacilitiesService.getAllFacilities().subscribe({
      next: (res) => {
        console.log(res.data.facilities)
        this.facilitiesList = res.data.facilities
        this.dataSource = new MatTableDataSource(this.facilitiesList);
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

  openFacilityDialog(facility: any, formName: string) {
    const dialogRef = this.dialog.open(AddEditFacilitiesComponent, {
      width: '400px',
      data: { facility, formName }
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.getAllFacilities();
    });
  }


  // open Dialog
  openDialog(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      minHeight: '300px',
      data: { name: name, id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteFacility(id);
      }
    })
  }
  //delete Facility
  DeleteFacility(id: number) {
    this._FacilitiesService.deleteFacility(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      complete: () => {
        this._ToastrService.success('Deleted Facility successfully');
        this.getAllFacilities()
      }
    });
  }



  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}








