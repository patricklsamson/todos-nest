import { Module } from '@nestjs/common';
import { TagEntity } from '../models/tag/tag.entity';
import { TagController } from '../controllers/tag.controller';
import { TagService } from '../services/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagResolver } from '../resolvers/tag.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagResolver, TagService]
})
export class TagModule {}
