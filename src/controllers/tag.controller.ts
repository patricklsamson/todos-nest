import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { Tag } from '../models/tag/tag';
import { TagService } from '../services/tag.service';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get('dto')
  findAllDtos(): Tag[] {
    return this.tagService.findAllDtos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Get('dto/:id')
  findOneDto(@Param('id', ParseIntPipe) id: number):Tag {
    return this.tagService.findOneDto(id);
  }

  @Post()
  create(@Body() tag: Tag): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Post('dto')
  createDto(@Body() tag: Tag): Tag {
    return this.tagService.createDto(tag);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: Tag): Promise<Tag> {
    return this.tagService.update(id, tag);
  }

  @Put('dto/:id')
  updateDto(@Param('id', ParseIntPipe) id: number, @Body() tag: Tag): Tag {
    return this.tagService.updateDto(id, tag);
  }

  @Delete()
  removeAll(): void {
    this.tagService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.tagService.remove(id);
  }

  @Delete('dto/:id')
  removeDto(@Param('id', ParseIntPipe) id: number): void {
    this.tagService.removeDto(id);
  }
}
