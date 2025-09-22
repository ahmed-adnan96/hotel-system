import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-delete',
  imports: [SharedModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DeleteComponent>){}
  CloseModal(): void {
    this.dialogRef.close(false);
  }
  SubmitModal(){
    this.dialogRef.close(true);
  }
}
