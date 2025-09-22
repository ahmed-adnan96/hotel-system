import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from '../../../core/Services/booking.service';
import { IBooking } from '../../../core/interfaces/IBooking';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookingComponent } from '../components/view-booking/view-booking.component';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-booking',
  imports: [SharedModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements AfterViewInit, OnInit {
  //#region inject Services
  private readonly _BookingService = inject(BookingService);
  constructor(private dialog: MatDialog) {}
  //#endregion

  //#region declaration properties
  page: number = 1;
  size: number = 10;
  totalCount: number = 0;
  showFirstLastButtons = true;
  ELEMENT_DATA: IBooking[] = [];

  //#endregion

  //#region void
  getAllBooking() {
    const bookingPram = {
      page: this.page,
      size: this.size,
    };
    this._BookingService.getAllBooking(bookingPram).subscribe({
      next: (res) => {
        this.ELEMENT_DATA = res.data.booking;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.Sort;
        this.totalCount = res.data.totalCount;
      },
    });
  }
  //#endregion

  //#region Table
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = [
    'roomNumber',
    'totalPrice',
    'startDate',
    'endDate',
    'userName',
    'action',
  ];

  dataSource: any;
  @ViewChild(MatSort) Sort!: MatSort;
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //#endregion

  //#region component life Cycle
  ngOnInit(): void {
    this.getAllBooking();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.Sort;
  }
  //#endregion

  //#region pagination
  handlePageEvent(e: any) {
    console.log(e);
    this.size = e.pageSize;
    this.page = e.pageIndex - 1;
    this.getAllBooking();
  }
  //#endregion

  openDialogView(data: any) {
    console.log('openDialogView clicked:', data);
    this.dialog.open(ViewBookingComponent, {
      width: '400px',
      minHeight: '300px',
      data: data,
    });
  }
}
