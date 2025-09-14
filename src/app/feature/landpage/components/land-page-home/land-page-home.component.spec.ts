import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPageHomeComponent } from './land-page-home.component';

describe('LandPageHomeComponent', () => {
  let component: LandPageHomeComponent;
  let fixture: ComponentFixture<LandPageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandPageHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandPageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
