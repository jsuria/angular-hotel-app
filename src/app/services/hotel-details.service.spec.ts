import { TestBed } from '@angular/core/testing';

import { HotelDetailsService } from './hotel-details.service';

describe('HotelDetailsService', () => {
  let service: HotelDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
