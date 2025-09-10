import { Data } from './../../../facilities/interfaces/ifacilities';
import { RoomingService } from './../../services/rooming.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IRootObject } from '../../interfaces/IRoom';
import { ViewRoomComponent } from '../view-room/view-room.component';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllRooms();
  }

  openDialog(roomId: String) {
    const dialogRef = this.dialog.open(ViewRoomComponent, {
      data: { roomId },

      width: 'auto',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
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
}
