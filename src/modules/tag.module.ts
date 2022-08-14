import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '../controllers/tag/tag.controller';
import { TagDbController } from '../controllers/tag/tag-db.controller';
import indexEntity from '../models/index.entity';
import { TagDbResolver } from "../resolvers/tag/tag-db.resolver";
import { TagResolver } from "../resolvers/tag/tag.resolver";
import { TagDbService } from "../services/tag/tag-db.service";
import { TagService } from "../services/tag/tag.service";
import { TagGqlDbService } from '../services/tag/tag-gql-db.service';

@Module({
  imports: [TypeOrmModule.forFeature(indexEntity)],
  controllers: [TagController, TagDbController],
  providers: [
    TagDbResolver,
    TagDbService,
    TagGqlDbService,
    TagResolver,
    TagService,
  ]
})
export class TagModule {}
