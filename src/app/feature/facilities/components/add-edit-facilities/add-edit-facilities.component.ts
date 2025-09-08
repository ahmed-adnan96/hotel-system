import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FacilitiesService } from '../../services/facilities.service';
import { log } from 'console';

@Component({
  selector: 'app-add-edit-facilities',
  templateUrl: './add-edit-facilities.component.html',
  styleUrl: './add-edit-facilities.component.scss',
  standalone: false,
})
export class AddEditFacilitiesComponent implements OnInit {
  //#region  constructor
  constructor(
    private dialogRef: MatDialogRef<AddEditFacilitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | null,
    private readonly _FacilitiesService: FacilitiesService,
    private toastr: ToastrService
  ) {}

  //#endregion
  //#region  declaration properties
  private addFacilitySub!: Subscription;
  formName!: string;
  FacilityID!: number;
  FacilityName!: string;

  //#endregion

  //#region declaration FormGroup
  FacilityForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
      Validators.minLength(3),
    ]),
  });
  //#endregion

  //#region declaration void

  addEditFacility(data: FormGroup) {
    if (this.FacilityForm.invalid) {
      this.FacilityForm.markAllAsTouched();
      return;
    }
    if (this.formName === 'addFacility') {
      this.addFacilitySub = this._FacilitiesService
        .addNewFacility(data.value)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(
              `add ${res.name} success id:${res.id}`,
              'success!'
            );
            this.closeDialog();
          },
        });
    } else if (this.formName === 'editFacility') {
      this.addFacilitySub = this._FacilitiesService
        .editFacility(this.FacilityID, data.value)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(
              `update ${res.name} success id:${res.id}`,
              'success!'
            );
            this.closeDialog();
          },
        });
    }
  }
  receiveData() {
    if (this.data) {
      this.formName = this.data.formName ?? '';
      this.FacilityID = this.data.facility?._id ?? 0;
      this.FacilityName = this.data.facility?.name ?? '';
      if (this.formName === 'viewFacility') {
        this.FacilityForm.get('name')?.disable();
      } else {
        this.FacilityForm.get('name')?.enable();
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.addFacilitySub.unsubscribe();
  }
  //#endregion

  //#region Component Life Cycle
  ngOnInit(): void {
    this.receiveData();
    this.FacilityForm.patchValue({
      name: this.FacilityName,
    });
  }
  //#endregion
}
//
