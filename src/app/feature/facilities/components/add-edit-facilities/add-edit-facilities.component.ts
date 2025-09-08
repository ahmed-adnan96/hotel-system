import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FacilitiesService } from '../../services/facilities.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _FacilitiesService: FacilitiesService,
    private toastr: ToastrService
  ) {}
  //#endregion
  //#region  declaration properties
  private addFacilitySub!: Subscription;
  formName: string = 'add'; //this.data.formName;
  FacilityID: number = 1; // this.data.catID;
  FacilityName: string = 'Mohamed'; // this.data.catName;
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
          },
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.addFacilitySub.unsubscribe();
  }
  //#endregion

  //#region Component Life Cycle
  ngOnInit(): void {
    this.FacilityForm.patchValue({
      name: this.FacilityName,
    });
  }
  //#endregion
}
// 
