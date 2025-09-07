import { FacilitiesService } from './../../services/facilities.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Facility } from '../../interfaces/ifacilities';


@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.scss'],
  standalone: false
})
export class FacilitiesListComponent implements OnInit {
  facilitiesList: Facility[] = [];
  displayedColumns: string[] = ['name', 'createdBy', 'createdAt','action'];
  dataSource: any
  constructor(private _FacilitiesService: FacilitiesService) { }
  ngOnInit(): void {
    this.getAllFacilities();
  }






  getAllFacilities() {
    console.log('done')
    this._FacilitiesService.getAllFacilities().subscribe({
      next: (res) => {
        console.log(res.data.facilities)
        this.facilitiesList = res.data.facilities
        this.dataSource = new MatTableDataSource(this.facilitiesList);

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
}
