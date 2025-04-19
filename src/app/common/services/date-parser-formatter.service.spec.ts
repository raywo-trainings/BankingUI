import { TestBed } from "@angular/core/testing";

import { DateParserFormatterService } from "./date-parser-formatter.service";


describe('DateParserFormatterService', () => {
  let service: DateParserFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateParserFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
