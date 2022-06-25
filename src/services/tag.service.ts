import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../models/tag/tag';
import { TagEntity } from '../models/tag/tag.entity';

@Injectable()
export class TagService {
  public tags: Tag[] = [];

  constructor(
    @InjectRepository(TagEntity) private tagRepository: Repository<TagEntity>
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find({
      relations: ['todo']
    });
  }

  findAllDtos(): Tag[] {
    return this.tags;
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  findOneDto(id: number): Tag {
    return this.tags.find(tagDto => tagDto.id === id);
  }

  create(tag: Tag): Promise<Tag> {
    const { todo } = tag;
    const newTag: Tag = this.tagRepository.create(tag);

    return this.tagRepository.save(newTag);
  }

  createDto(tagDto: Tag): Tag {
    this.tags.push(tagDto);

    return tagDto;
  }

  async update(id: number, tag: Tag): Promise<Tag> {
    await this.tagRepository.update(id, tag);

    return this.tagRepository.findOneBy({ id: id });
  }

  updateDto(id: number, tag: Tag): Tag {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    const updateTag: Tag = {
      ...tag,
      id
    };

    this.tags[index] = updateTag;

    return updateTag;
  }

  async removeAll(): Promise<void> {
    const tags: Tag[] = await this.tagRepository.find();

    tags.forEach(tag => this.tagRepository.delete(tag.id));
  }

  remove(id: number): void {
    this.tagRepository.delete(id);
  }

  removeDto(id: number): void {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    this.tags.splice(index, 1);
  }
}
