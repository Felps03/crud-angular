import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service).toBeTruthy();
  });
});
