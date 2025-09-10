import { RoomingService } from './../../services/rooming.service';
import { Component, OnInit,  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  constructor(private _RoomingService: RoomingService) {}
  ngOnInit(): void {
    this.getAllRooms();
  }

  openDialog(arg0: any, arg1: string) {
    throw new Error('Method not implemented.');
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
