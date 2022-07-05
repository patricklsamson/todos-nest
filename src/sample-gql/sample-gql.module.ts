import { Module } from '@nestjs/common';
import { SampleGqlService } from './sample-gql.service';
import { SampleGqlResolver } from './sample-gql.resolver';

@Module({
  providers: [SampleGqlResolver, SampleGqlService]
})
export class SampleGqlModule {}
