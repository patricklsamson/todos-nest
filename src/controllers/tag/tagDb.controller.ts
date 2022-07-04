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
import { TagDbService } from '../../services/tag/tagDb.service';

@Controller('tags')
@UseInterceptors(TransformInterceptor)
export class TagDbController {
  constructor(private tagService: TagDbService) {}

  @Get('db')
  findAll(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @Get('db/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TagDto> {
    return this.tagService.findOne(id);
  }

  @Post('db')
  create(@Body() tag: TagDto): Promise<TagDto> {
    return this.tagService.create(tag);
  }

  @Put('db/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: TagDto): Promise<TagDto> {
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