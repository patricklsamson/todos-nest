import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // UseInterceptors
} from '@nestjs/common';
// import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { TagDb } from '../../models/tag/tag-db.entity';
import { CreateTagDbInput } from '../../requests/tag/create-tag-db.input';
import { UpdateTagDto } from '../../requests/tag/update-tag.dto';
import { TagDbService } from '../../services/tag/tag-db.service';

@Controller('db-tags')
// @UseInterceptors(TransformInterceptor)
export class TagDbController {
  constructor(private tagService: TagDbService) {}

  @Get()
  findAll(): Promise<TagDb[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TagDb> {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() tag: CreateTagDbInput): Promise<TagDb> {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: UpdateTagDto
  ): Promise<TagDb> {
    return this.tagService.update(id, tag);
  }

  @Delete()
  removeAll(): Promise<object> {
    return this.tagService.removeAll();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.tagService.removeOne(id);
  }
}