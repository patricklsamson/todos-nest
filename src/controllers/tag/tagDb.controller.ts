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
import { TagDbService } from '../../services/tag/tagDb.service';

@Controller('tags')
@UseInterceptors(TransformInterceptor)
export class TagDbController {
  constructor(private tagService: TagDbService) {}

  @Get('db')
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get('db/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Post('db')
  create(@Body() tag: Tag): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Put('db/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: Tag): Promise<Tag> {
    return this.tagService.update(id, tag);
  }

  @Delete('db')
  removeAll(): void {
    this.tagService.removeAll();
  }

  @Delete('db/:id')
  removeOne(@Param('id', ParseIntPipe) id: number): void {
    this.tagService.removeOne(id);
  }
}