import { TestBed } from '@angular/core/testing';

import { StudnetsService } from './studnets.service';

describe('StudnetsService', () => {
  let service: StudnetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudnetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
