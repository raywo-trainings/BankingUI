import { TestBed } from "@angular/core/testing";

import { OnlineStatusService } from "./online-status.service";


describe('ConnectionTesterService', () => {
  let service: OnlineStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
