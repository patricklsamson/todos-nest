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
import { TagDto } from '../../models/tag/tag.dto';
import { TagNoDbService } from '../../services/tag/tagNoDb.service';

@Controller('tags')
@UseInterceptors(TransformInterceptor)
export class TagNoDbController {
  constructor(private tagService: TagNoDbService) {}

  @Get()
  findAll(): TagDto[] {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):TagDto {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() tag: TagDto): TagDto {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: TagDto): TagDto {
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
