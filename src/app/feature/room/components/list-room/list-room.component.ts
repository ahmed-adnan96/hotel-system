import { Data } from './../../../facilities/interfaces/ifacilities';
import { RoomingService } from './../../services/rooming.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { IRootObject } from '../../interfaces/IRoomDetailes';

import { ViewRoomComponent } from '../view-room/view-room.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../../../shared/components/delete/delete.component';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrl: './list-room.component.scss',
  standalone: false,
})
export class ListRoomComponent implements OnInit {
  displayedColumns: string[] = [
    'Room Number',
    'Price',
    'Capacity',
    'Discount',
    'Images',
    'Facilities',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;
  pageSize: number = 10;
  PageNumber: number = 1;
  roomList: any;
  constructor(
    private _RoomingService: RoomingService,
    private dialog: MatDialog,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllRooms();
  }

  openDialog(roomId: String) {
    const dialogRef = this.dialog.open(ViewRoomComponent, {
      data: { roomId },
      width: '1000PX',
    });
  }

  openFacilityDialog(_t102: any, arg1: string) {
    throw new Error('Method not implemented.');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAllRooms() {
    let params = {
      size: this.pageSize,
      page: this.PageNumber,
    };
    this._RoomingService.getAllRoom(params).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data.rooms);
      },
    });
  }

  // open Dialog
  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      minHeight: '300px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.DeleteRoom(id);
      }
    });
  }

  //delete Room
  DeleteRoom(id: number) {
    this._RoomingService.deleteRoom(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        this._ToastrService.success('Deleted room successfully');
        this.getAllRooms();
      },
    });
  }
}
