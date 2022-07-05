import { Test, TestingModule } from '@nestjs/testing';
import { SampleGqlResolver } from './sample-gql.resolver';
import { SampleGqlService } from './sample-gql.service';

describe('SampleGqlResolver', () => {
  let resolver: SampleGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleGqlResolver, SampleGqlService],
    }).compile();

    resolver = module.get<SampleGqlResolver>(SampleGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
