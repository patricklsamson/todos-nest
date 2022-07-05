import { CreateSampleGqlInput } from './create-sample-gql.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSampleGqlInput extends PartialType(CreateSampleGqlInput) {
  @Field(() => Int)
  id: number;
}
