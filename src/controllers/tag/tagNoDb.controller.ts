import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Tag } from '../../models/tag.entity';
import { TagNoDbService } from '../../services/tag/tagNoDb.service';

@Controller('tags')
@UseInterceptors(TransformInterceptor)
export class TagNoDbController {
  constructor(private tagService: TagNoDbService) {}

  @Get()
  findAll(): Tag[] {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Tag {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() tag: Tag): Tag {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: Tag): Tag {
    return this.tagService.update(id, tag);
  }

  @Delete()
  removeAll(): void {
    this.tagService.removeAll();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): void {
    this.tagService.removeOne(id);
  }
}
