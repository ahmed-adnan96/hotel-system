import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RoomingService } from '../../../room/services/rooming.service';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AdsService } from '../../services/ads.service';


@Component({
  selector: 'app-add-edit-ads',
  templateUrl: './add-edit-ads.component.html',
  styleUrl: './add-edit-ads.component.scss',
  standalone: false,
})
export class AddEditAdsComponent implements OnInit {
  roomList: any;
  AdsDetails:any
  roomPrice:any
  constructor(
    private _AdsService: AdsService,
    private _RoomingService: RoomingService,
    public dialogRef: MatDialogRef<AddEditAdsComponent>,
    private _ToastrService:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {_id:any }
  ) {}
  ngOnInit(): void {
    this.GetAllRooms()
    if (this.data && this.data._id) {
      this.getAdsById();
    }
  }

  AddAdsForm = new FormGroup({
    room: new FormControl(null , [Validators.required]),
    discount: new FormControl(null ,  [Validators.required]),
    isActive: new FormControl(null ,  [Validators.required]),
  });

  //close Dialouge
  onNoClick(): void {
    this.dialogRef.close();
  }

  //senAddForm Data
  AddNewAds() {
    this._AdsService.AddNewAdd(this.AddAdsForm.value).subscribe({
      next: (res) => {
        this._ToastrService.success('you Ads has been added successfully')
      },
    });
  }

  //get all rooms to display in drop minue
  GetAllRooms() {
    let params = {
      size: '99999',
      page: 1,
    };
    this._RoomingService.getAllRoom(params).subscribe({
      next: (res) => {
        this.roomList = res.data.rooms;
      },
    });
  }

  getAdsById(){
    this._AdsService.GetAdsById(this.data._id).subscribe({
      next:(res)=>{
        this.AdsDetails = res.data.ads
        this.AddAdsForm.patchValue({
          room: this.AdsDetails.room._id,
          isActive: this.AdsDetails.isActive,
          discount:this.AdsDetails.room.discount,
        })
        this.AddAdsForm.updateValueAndValidity();
      },

    })
  }

  UpdateAds(){
  const formValue = this.AddAdsForm.value;
  let payload = {
    discount: formValue.discount,
    isActive: formValue.isActive,
  };
  console.log(payload)
    this._AdsService.EditADs(this.data._id, payload).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message)
        this.SubmitModal()
      },
    })
  }

    SubmitModal() {
    this.dialogRef.close(true);
  }

}
