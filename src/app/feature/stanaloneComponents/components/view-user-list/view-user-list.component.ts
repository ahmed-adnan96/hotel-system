import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-view-user-list',
  imports: [SharedModule],
  templateUrl: './view-user-list.component.html',
  styleUrl: './view-user-list.component.scss',
    standalone:true
})
export class ViewUserListComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewUserListComponent>) { }
  CloseModal(): void {
    this.dialogRef.close(false);
  }
}
