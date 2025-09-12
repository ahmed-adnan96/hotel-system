import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-view-booking',
  imports: [SharedModule],
  templateUrl: './view-booking.component.html',
  styleUrl: './view-booking.component.scss',
  standalone:true
})
export class ViewBookingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewBookingComponent>) { }
  CloseModal(): void {
    this.dialogRef.close(false);
  }
}
