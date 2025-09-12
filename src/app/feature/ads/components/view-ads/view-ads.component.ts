import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAd } from '../../interfaces/IAds';

@Component({
  selector: 'app-view-ads',
  templateUrl: './view-ads.component.html',
  styleUrl: './view-ads.component.scss',
  standalone: false
})
export class ViewAdsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IAd, public dialogRef: MatDialogRef<ViewAdsComponent>) { }
  CloseModal(): void {
    this.dialogRef.close(false);
  }
}
