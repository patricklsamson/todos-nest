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
    const tag: Tag = this.tagService.findOne(id);

    if (!tag) throw new NotFoundException();

    return tag;
  }

  @Post()
  create(@Body() tag: CreateTagInput): Tag {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: UpdateTagDto
  ): Tag|boolean {
    const updatedTag: Tag|boolean = this.tagService.update(id, tag);

    if (!updatedTag) throw new NotFoundException();

    return updatedTag;
  }

  @Delete()
  removeAll(): object {
    return { success: this.tagService.removeAll() };
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): object {
    const success: boolean = this.tagService.removeOne(id);

    if (!success) throw new NotFoundException();

    return { success: true };
  }
}
