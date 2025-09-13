import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRoomComponent } from './layout-room.component';

describe('LayoutRoomComponent', () => {
  let component: LayoutRoomComponent;
  let fixture: ComponentFixture<LayoutRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
