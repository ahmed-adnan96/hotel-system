import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewFacilitiesComponent } from './components/view-facilities/view-facilities.component';
import { FacilitiesListComponent } from './components/facilities-list/facilities-list.component';
import { AddEditFacilitiesComponent } from './components/add-edit-facilities/add-edit-facilities.component';

const routes: Routes = [
  { path: '', redirectTo: 'facilitiesList', pathMatch: 'full' },
  { path: 'facilitiesList', component: FacilitiesListComponent },
  { path: 'add', component: AddEditFacilitiesComponent },
  { path: 'edit/:id', component: AddEditFacilitiesComponent },
  { path: 'view', component: ViewFacilitiesComponent },
];
@NgModule({
  declarations: [
    FacilitiesListComponent,
    AddEditFacilitiesComponent,
    ViewFacilitiesComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class FacilitiesModule {}
