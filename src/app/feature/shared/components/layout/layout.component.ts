import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HomeComponent } from "../home/home.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthRoutingModule } from "../../../auth/auth-routing.module";

@Component({
  selector: 'app-layout',
  imports: [SidebarComponent, HomeComponent, NavbarComponent, AuthRoutingModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
