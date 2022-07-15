import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '../controllers/tag/tag.controller';
import { TagDbController } from '../controllers/tag/tag-db.controller';
import indexEntity from '../models/index.entity';
import { TagDbResolver } from "../resolvers/tag/tag-db.resolver";
import { TagNoDbResolver } from "../resolvers/tag/tag.resolver";
import { TagDbService } from "../services/tag/tag-db.service";
import { TagGqlDbService } from "../services/tag/tag-gql-db.service";
import { TagGqlService } from "../services/tag/tag-gql.service";
import { TagService } from "../services/tag/tag.service";

@Module({
  imports: [TypeOrmModule.forFeature(indexEntity)],
  controllers: [TagController, TagDbController],
  providers: [
    TagDbResolver,
    TagDbService,
    TagGqlDbService,
    TagGqlService,
    TagNoDbResolver,
    TagService
  ]
})
export class TagModule {}
