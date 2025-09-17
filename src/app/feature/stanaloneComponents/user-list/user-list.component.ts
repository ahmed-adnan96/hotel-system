import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from '../../../core/Services/booking.service';
import { SharedModule } from '../../shared/shared.module';
import { IUserDetails, IUserRootObject } from '../../../core/interfaces/IUser';
import { ViewUserListComponent } from '../components/view-user-list/view-user-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  imports: [SharedModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit, OnInit {
  //#region inject Services
  private readonly _BookingService = inject(BookingService);
  constructor(private dialog: MatDialog) {}
  //#endregion

  //#region declaration properties
  page: number = 1;
  size: number = 10;
  totalCount: number = 0;
  showFirstLastButtons = true;
  ELEMENT_DATA: IUserDetails[] = [];

  //#endregion

  //#region void
  getAllUsers() {
    const bookingPram = {
      page: this.page,
      size: this.size,
    };
    this._BookingService.getAllUsers(bookingPram).subscribe({
      next: (res: IUserRootObject) => {
        this.ELEMENT_DATA = res.data.users;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.Sort;
        this.totalCount = res.data.totalCount;
      },
    });
  }
  openDialogView(data: any) {
    console.log('openDialogView clicked:', data);
    this.dialog.open(ViewUserListComponent, {
      width: '400px',
      minHeight: '300px',
      data: data,
    });
  }

  //#endregion

  //#region Table
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = [
    'userName',
    'email',
    'phoneNumber',
    'country',
    'createdAt',
    'updatedAt',
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
    this.getAllUsers();
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
    this.getAllUsers();
  }
  //#endregion
}
