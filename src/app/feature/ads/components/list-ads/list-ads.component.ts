import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAdsComponent } from '../add-edit-ads/add-edit-ads.component';

@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrl: './list-ads.component.scss',
  standalone:false
})
export class ListAdsComponent {
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddEditAdsComponent, {
      data: {
        height : '80vh',
        width : '70vh'
      },
    });
  }

  openEditDialog(id:any) {
    this.dialog.open(AddEditAdsComponent, {
      data: {
        _id : id,
        height : '80vh',
        width : '70vh'
      },
    });
  }
}
