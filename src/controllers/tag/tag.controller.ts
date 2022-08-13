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
import { Tag } from '../../models/tag/tag.entity';
import { CreateTagInput } from '../../requests/tag/create-tag.input';
import { UpdateTagDto } from '../../requests/tag/update-tag.dto';
import { TagService } from '../../services/tag/tag.service';

@Controller('tags')
@UseInterceptors(TransformInterceptor)
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll(): Tag[] {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Tag {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() tag: CreateTagInput): Tag {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: UpdateTagDto
  ): Tag {
    return this.tagService.update(id, tag);
  }

  @Delete()
  removeAll(): boolean {
    return this.tagService.removeAll();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): boolean {
    return this.tagService.removeOne(id);
  }
}
