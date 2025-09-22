import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: false,
})
export class LayoutComponent implements OnInit {
  screenWidth: number = 0;
  IsSideOpen: boolean = false;
  constructor(private _SidebarService: SidebarService) {

  }
  ngOnInit(): void {
    this._SidebarService.isOpened$.subscribe((value) => { this.IsSideOpen = value })
    this._SidebarService.screenWidth$.subscribe((value) => { this.screenWidth = value })
  }


  getBodyClass(): string {
    let style_Class = " ";
    if (this.IsSideOpen && this.screenWidth > 768) {
      style_Class = 'when_side_open'
    }
    else if (this.IsSideOpen && this.screenWidth <= 768 && this.screenWidth > 0) {
      style_Class = 'when_side_close'
    }
    return style_Class;

  }
}
