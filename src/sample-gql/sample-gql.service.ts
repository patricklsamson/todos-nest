import { Injectable } from '@nestjs/common';
import { CreateSampleGqlInput } from './dto/create-sample-gql.input';
import { UpdateSampleGqlInput } from './dto/update-sample-gql.input';

@Injectable()
export class SampleGqlService {
  create(createSampleGqlInput: CreateSampleGqlInput) {
    return 'This action adds a new sampleGql';
  }

  findAll() {
    return `This action returns all sampleGql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sampleGql`;
  }

  update(id: number, updateSampleGqlInput: UpdateSampleGqlInput) {
    return `This action updates a #${id} sampleGql`;
  }

  remove(id: number) {
    return `This action removes a #${id} sampleGql`;
  }
}
