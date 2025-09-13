import { Component } from '@angular/core';
import { RoomNavbarComponent } from '../room-navbar/room-navbar.component';
import { AuthRoutingModule } from '../../../auth/auth-routing.module';
import { RoomFooterComponent } from '../room-footer/room-footer.component';

@Component({
  selector: 'app-layout-room',
  templateUrl: './layout-room.component.html',
  styleUrl: './layout-room.component.scss',
  standalone: false,
})
export class LayoutRoomComponent {}
