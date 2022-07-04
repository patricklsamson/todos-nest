import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagDbController } from '../controllers/tag/tagDb.controller';
import { TagNoDbController } from '../controllers/tag/tagNoDb.controller';
import entities from '../models/index.entity';
import tagProviders from '../providers/tag.provider';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [TagDbController, TagNoDbController],
  providers: tagProviders
})
export class TagModule {}
