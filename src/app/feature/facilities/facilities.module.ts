import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewFacilitiesComponent } from './components/view-facilities/view-facilities.component';
import { FacilitiesListComponent } from './components/facilities-list/facilities-list.component';
import { AddEditFacilitiesComponent } from './components/add-edit-facilities/add-edit-facilities.component';
import { DialogModule } from '@angular/cdk/dialog';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'facilitiesList', pathMatch: 'full' },
  { path: 'facilitiesList', component: FacilitiesListComponent },
  { path: 'view', component: ViewFacilitiesComponent },
];
@NgModule({
  declarations: [
    FacilitiesListComponent,
    AddEditFacilitiesComponent,
    ViewFacilitiesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    DialogModule,
  ],
})
export class FacilitiesModule {}
