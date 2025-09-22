import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandPageHomeComponent } from './components/landingPage-home/land-page-home.component';
import { ViewAllRoomsComponent } from './components/view-all-rooms/view-all-rooms.component';
import { LayoutRoomComponent } from './components/layout-room/layout-room.component';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { RoomFooterComponent } from '../../shared/components/room-footer/room-footer.component';
import { SharedModule } from '../../shared/shared.module';
import { RoomNavbarComponent } from "../../shared/components/room-navbar/room-navbar.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutRoomComponent,
    children: [
      { path: 'Home', component: LandPageHomeComponent },
      { path: 'RoomDetails/:id', component: RoomDetailsComponent },
      { path: 'ViewAllRooms', component: ViewAllRoomsComponent },
      { path: 'myProfile', component: ProfileComponent },
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
    ViewAllRoomsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), RoomNavbarComponent],
})
export class LandingPageModule { }
