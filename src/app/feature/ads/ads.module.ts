import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { ListAdsComponent } from './components/list-ads/list-ads.component';
import { AddEditAdsComponent } from './components/add-edit-ads/add-edit-ads.component';
import { SharedModule } from "../shared/shared.module";


const routes: Routes = [
  {path:'',redirectTo:'adsList',pathMatch:'full'},
  {path:'adsList',component:ListAdsComponent,title:'Ads List'},
  {path:'addAds',component:AddEditAdsComponent,title:'Add Ads'},
  {path:'editAds',component:AddEditAdsComponent,title:'Edit Ads'}
]
@NgModule({
  declarations: [
    AddEditAdsComponent,
    ListAdsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
]
})
export class AdsModule { }
