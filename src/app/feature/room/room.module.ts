import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { ListRoomComponent } from './components/list-room/list-room.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'listRoom', pathMatch: 'full' },
  { path: 'viewRoom', component: ViewRoomComponent, title: 'view room' },
  { path: 'addRoom', component: AddRoomComponent, title: 'add room' },
  { path: 'editRoom/:id', component: EditRoomComponent, title: 'edit room' },
  {
    path: 'listRoom',
    component: ListRoomComponent,
    title: 'Rooms',
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RoomRoutingModule,
  ],
})
export class RoomModule {}
