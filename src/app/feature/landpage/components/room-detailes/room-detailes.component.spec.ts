import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailesComponent } from './room-detailes.component';

describe('RoomDetailesComponent', () => {
  let component: RoomDetailesComponent;
  let fixture: ComponentFixture<RoomDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
