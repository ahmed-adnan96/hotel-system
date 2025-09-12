import { SidebarService } from './../../services/sidebar.service';
import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { fadeInOut } from '../../../../core/helper';
import { log } from 'util';
interface IMenu {
  title: string;
  icon: string;
  menuLink?: string;
}
@Component({
  selector: 'app-sidebar',
  animations: [fadeInOut],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false,
})
export class SidebarComponent {
  SideBarOpened: boolean = true;
  screenWidth = 0;
  constructor(private _SideNavService: SidebarService) { }
  ngOnInit(): void {
    this._SideNavService.setWidth(window.innerWidth);
    this._SideNavService.isOpened$.subscribe((value) => {
      this.SideBarOpened = value;
    });
    this._SideNavService.screenWidth$.subscribe((value) => {
      this.screenWidth = value;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let widthScreen = window.innerWidth;
    if (widthScreen <= 768) {
      this._SideNavService.setIsOpened(false);
      this._SideNavService.setWidth(widthScreen);
    } else {
      this._SideNavService.setWidth(widthScreen);
    }
  }
  ToggleNav() {
    var isOpen = this._SideNavService.getIsOpened();
    isOpen = !isOpen;
    this._SideNavService.setIsOpened(isOpen);
  }
  closeSideNav() {
    this._SideNavService.setIsOpened(false);
    this._SideNavService.setWidth(window.innerWidth);
  }

  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'home',
      menuLink: '/dashboard/home',
    },
    {
      title: 'Facilites',
      icon: 'group',
      menuLink: '/dashboard/facilities',
    },

    {
      title: 'Room',
      icon: 'meeting_room',
      menuLink: '/dashboard/room',
    },
    {
      title: "Ads",
      icon: "ads_click",
      menuLink: "/dashboard/ads",
    },
    // {
    //   title:"Tasks",
    //   icon:"checklist",
    //   menuLink:"/dashboard/manager/tasks",
    //   isActive:this.isManager(),
    // }
    // ,
    // {
    //   title:"Projects",
    //   icon:"dashboard",
    //   menuLink:"/dashboard/employee/projects",
    //   isActive:this.isEmployee(),
    // },
    // {
    //   title:"Tasks",
    //   icon:"checklist",
    //   menuLink:"/dashboard/employee/tasks",
    //   isActive:this.isEmployee(),
    // },
  ];
}
