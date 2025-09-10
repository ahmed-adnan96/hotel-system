import { RoomingService } from './../../services/rooming.service';
import { Component, OnInit, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../shared/components/delete/delete.component';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private _RoomingService: RoomingService, private _ToastrService: ToastrService, private dialog: MatDialog) { }
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

  // open Dialog
  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      minHeight: '300px',
      data: { name: name, id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteRoom(id);
      }
    })
  }



  //delete Room
  DeleteRoom(id: number) {
    this._RoomingService.deleteRoom(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      complete: () => {
        this._ToastrService.success('Deleted room successfully');
        this.getAllRooms()
      }
    });
  }
}
