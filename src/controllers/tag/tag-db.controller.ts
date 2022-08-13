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
  UseInterceptors
} from '@nestjs/common';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { TagDb } from '../../models/tag/tag-db.entity';
import { CreateTagDbInput } from '../../requests/tag/create-tag-db.input';
import { UpdateTagDto } from '../../requests/tag/update-tag.dto';
import { TagDbService } from '../../services/tag/tag-db.service';

@Controller('db-tags')
@UseInterceptors(TransformInterceptor)
export class TagDbController {
  constructor(private tagService: TagDbService) {}

  @Get()
  findAll(): Promise<TagDb[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TagDb> {
    try {
      return await this.tagService.findOne(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post()
  create(@Body() tag: CreateTagDbInput): Promise<TagDb> {
    return this.tagService.create(tag);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: UpdateTagDto
  ): Promise<TagDb> {
    try {
      return await this.tagService.update(id, tag);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete()
  removeAll(): Promise<boolean> {
    return this.tagService.removeAll();
  }

  @Delete(':id')
  async removeOne(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
      return await this.tagService.removeOne(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}