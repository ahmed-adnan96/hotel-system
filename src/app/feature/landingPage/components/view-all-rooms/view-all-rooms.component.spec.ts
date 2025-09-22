import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRoomsComponent } from './view-all-rooms.component';

describe('ViewAllRoomsComponent', () => {
  let component: ViewAllRoomsComponent;
  let fixture: ComponentFixture<ViewAllRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
