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
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { TagDto } from '../models/tag/tag.dto';
import { TagService } from '../services/tag.service';

@Controller('tags')
@UseInterceptors(TransformInterceptor)
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll(): TagDto[] {
    return this.tagService.findAll();
  }

  @Get('ent')
  findAllEnts(): Promise<TagDto[]> {
    return this.tagService.findAllEnts();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):TagDto {
    return this.tagService.findOne(id);
  }

  @Get('ent/:id')
  findOneEnt(@Param('id', ParseIntPipe) id: number): Promise<TagDto> {
    return this.tagService.findOneEnt(id);
  }

  @Post()
  create(@Body() tag: TagDto): TagDto {
    return this.tagService.create(tag);
  }

  @Post('ent')
  createEnt(@Body() tag: TagDto): Promise<TagDto> {
    return this.tagService.createEnt(tag);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: TagDto): TagDto {
    return this.tagService.update(id, tag);
  }

  @Put('ent/:id')
  updateEnt(@Param('id', ParseIntPipe) id: number, @Body() tag: TagDto): Promise<TagDto> {
    return this.tagService.updateEnt(id, tag);
  }

  @Delete()
  removeAll(): void {
    this.tagService.removeAll();
  }

  @Delete()
  removeAllEnts(): void {
    this.tagService.removeAllEnts();
  }

  @Delete(':id')
  removeDto(@Param('id', ParseIntPipe) id: number): void {
    this.tagService.removeOne(id);
  }

  @Delete('ent/:id')
  removeOneEnt(@Param('id', ParseIntPipe) id: number): void {
    this.tagService.removeOneEnt(id);
  }
}
