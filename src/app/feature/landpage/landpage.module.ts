import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandPageHomeComponent } from './components/land-page-home/land-page-home.component';
import { ViewAllRoomsComponent } from './components/view-all-rooms/view-all-rooms.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoomComponent } from './components/layout-room/layout-room.component';
import { RoomFooterComponent } from './components/room-footer/room-footer.component';
import { RoomNavbarComponent } from './components/room-navbar/room-navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'layoutRoom', pathMatch: 'full' },
  {
    path: 'layoutRoom',
    component: LayoutRoomComponent,
    children: [
      { path: '', redirectTo: 'landPageHome', pathMatch: 'full' },
      { path: 'landPageHome', component: LandPageHomeComponent },
      { path: 'RoomDetails/:id', component: RoomDetailsComponent },
      { path: 'ViewAllRooms', component: ViewAllRoomsComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LandPageHomeComponent,
    LayoutRoomComponent,
    RoomFooterComponent,
    RoomDetailsComponent,
    RoomNavbarComponent,
    ViewAllRoomsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class LandpageModule { }
