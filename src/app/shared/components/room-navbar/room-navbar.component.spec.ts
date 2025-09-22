import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNavbarComponent } from './room-navbar.component';

describe('RoomNavbarComponent', () => {
  let component: RoomNavbarComponent;
  let fixture: ComponentFixture<RoomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
