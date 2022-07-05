import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SampleGqlService } from './sample-gql.service';
import { SampleGql } from './entities/sample-gql.entity';
import { CreateSampleGqlInput } from './dto/create-sample-gql.input';
import { UpdateSampleGqlInput } from './dto/update-sample-gql.input';

@Resolver(() => SampleGql)
export class SampleGqlResolver {
  constructor(private readonly sampleGqlService: SampleGqlService) {}

  @Mutation(() => SampleGql)
  createSampleGql(@Args('createSampleGqlInput') createSampleGqlInput: CreateSampleGqlInput) {
    return this.sampleGqlService.create(createSampleGqlInput);
  }

  @Query(() => [SampleGql], { name: 'sampleGql' })
  findAll() {
    return this.sampleGqlService.findAll();
  }

  @Query(() => SampleGql, { name: 'sampleGql' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sampleGqlService.findOne(id);
  }

  @Mutation(() => SampleGql)
  updateSampleGql(@Args('updateSampleGqlInput') updateSampleGqlInput: UpdateSampleGqlInput) {
    return this.sampleGqlService.update(updateSampleGqlInput.id, updateSampleGqlInput);
  }

  @Mutation(() => SampleGql)
  removeSampleGql(@Args('id', { type: () => Int }) id: number) {
    return this.sampleGqlService.remove(id);
  }
}
