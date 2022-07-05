import { Test, TestingModule } from '@nestjs/testing';
import { SampleGqlService } from './sample-gql.service';

describe('SampleGqlService', () => {
  let service: SampleGqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleGqlService],
    }).compile();

    service = module.get<SampleGqlService>(SampleGqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
