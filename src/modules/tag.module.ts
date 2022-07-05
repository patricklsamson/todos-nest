import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '../controllers/tag/tag.controller';
import { TagDbController } from '../controllers/tag/tagDb.controller';
import entities from '../models/index.entity';
import tagProviders from '../providers/tag.provider';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [TagController, TagDbController],
  providers: tagProviders
})
export class TagModule {}
