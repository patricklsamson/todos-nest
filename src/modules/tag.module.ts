import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '../controllers/tag.controller';
import { TagEntity } from '../models/tag/tag.entity';
import { TagResolver } from '../resolvers/tag.resolver';
import { TagService } from '../services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagResolver, TagService]
})
export class TagModule {}
