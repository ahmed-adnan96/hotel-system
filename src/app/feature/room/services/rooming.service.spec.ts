import { TestBed } from '@angular/core/testing';

import { RoomingService } from './rooming.service';

describe('RoomingService', () => {
  let service: RoomingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
