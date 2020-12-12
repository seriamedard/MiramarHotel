import { TestBed } from '@angular/core/testing';

import { MainstartService } from './mainstart.service';

describe('MainstartService', () => {
  let service: MainstartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainstartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
