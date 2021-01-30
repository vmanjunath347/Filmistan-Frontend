import { TestBed } from '@angular/core/testing';

import { Authguard2Service } from './authguard2.service';

describe('Authguard2Service', () => {
  let service: Authguard2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authguard2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
