import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomingService } from '../../services/rooming.service';
import { FacilitiesService } from '../../../facilities/services/facilities.service';
import { Facility } from '../../../facilities/interfaces/ifacilities';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss',
  standalone: false,
})
export class AddRoomComponent implements OnInit {

  srcImg?: string
  selectedFiles: File[] = [];
  facilitiesList: Facility[] = []
  constructor(private _roomService: RoomingService, private _facilitiesService: FacilitiesService, private _toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFacilities()
  }
  roomForm = new FormGroup({
    roomNumber: new FormControl(null, Validators.required),
    capacity: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    discount: new FormControl(null, Validators.required),
    facilities: new FormControl([], Validators.required),
  })


  createRoom() {
    let myData = new FormData();
    let formValues: any = this.roomForm.getRawValue();

    for (let key in formValues) {
      if (key === 'facilities') {
        formValues[key].forEach((id: string) => {
          myData.append('facilities', id);
        });
      } else {
        myData.append(key, formValues[key]);
      }
    }

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file: File) => {
        myData.append('imgs', file);
      });
    }

    this._roomService.createRoom(myData).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard/room/listRoom']);
      },
      complete: () => {
        this._toastrService.success('Room Created Successfully');
      }
    });
  }


  getAllFacilities() {
    this._facilitiesService.getAllFacilities().subscribe({
      next: (res) => {
        // console.log(res.data.facilities)
        this.facilitiesList = res.data.facilities
      }
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.selectedFiles.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }
}
