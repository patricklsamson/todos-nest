import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from '../models/tag/tag.dto';
import { TagEntity } from '../models/tag/tag.entity';
import { TagInput } from '../models/tag/tag.input';

@Injectable()
export class TagService {
  public tags: TagDto[] = [];
  public gqlTags: TagEntity[] = [];

  constructor(
    @InjectRepository(TagEntity) private tagRepository: Repository<TagEntity>
  ) {}

  findAll(): TagDto[] {
    return this.tags;
  }

  findAllTags(): TagEntity[] {
    return this.gqlTags;
  }

  findAllEnts(): Promise<TagDto[]> {
    return this.tagRepository.find({
      relations: ['todo']
    });
  }

  findAllTagEnts(): Promise<TagEntity[]> {
    return this.tagRepository.find({
      relations: ['todo']
    });
  }

  findOne(id: number): TagDto {
    return this.tags.find(tag => tag.id === id);
  }

  findOneTag(id: number): TagEntity {
    return this.gqlTags.find(tag => tag.id === id);
  }

  findOneEnt(id: number): Promise<TagDto> {
    return this.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  findOneTagEnt(id: number): Promise<TagEntity> {
    return this.tagRepository.findOneBy({ id: id });
  }

  create(tag: TagDto): TagDto {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  createTag(tag: TagInput): TagEntity {
    this.gqlTags = [
      ...this.gqlTags,
      { id: this.gqlTags.length + 1, ...tag }
    ];

    return tag;
  }

  createEnt(tag: TagDto): Promise<TagDto> {
    const newTag: TagDto = this.tagRepository.create(tag);

    return this.tagRepository.save(newTag);
  }

  createTagEnt(tag: TagInput): Promise<TagEntity> {
    const newTag: TagInput = this.tagRepository.create(tag);

    return this.tagRepository.save(newTag);
  }

  update(id: number, tag: TagDto): TagDto {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    const updateTag: TagDto = {
      ...tag,
      id
    };

    this.tags[index] = updateTag;

    return updateTag;
  }

  updateTag(updateTag: TagEntity): TagEntity|any {
    this.gqlTags = this.gqlTags.map(tag => {
      if (tag.id === updateTag.id) {
        return { ...updateTag };
      }

      return tag;
    });
  }

  async updateEnt(id: number, tag: TagDto): Promise<TagDto> {
    await this.tagRepository.update(id, tag);

    return this.tagRepository.findOneBy({ id: id });
  }

  async updateTagEnt(id: number, tag: TagInput): Promise<TagEntity> {
    await this.tagRepository.preload({
      id: id,
      ...tag
    });

    return this.tagRepository.save(tag);
  }

  removeAll(): void {
    this.tags = [];
  }

  removeAllTags(): void {
    this.gqlTags = [];
  }

  async removeAllEnts(): Promise<void> {
    const tags: TagDto[] = await this.tagRepository.find();

    tags.forEach(tag => this.tagRepository.delete(tag.id));
  }

  async removeAllTagEnts(): Promise<void> {
    const tags: TagEntity[] = await this.tagRepository.find();

    tags.forEach(tag => this.tagRepository.delete(tag.id));
  }

  removeOne(id: number): void {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    this.tags.splice(index, 1);
  }

  removeOneTag(id: number): void {
    this.gqlTags = this.gqlTags.filter(tag => tag.id !== id);
  }

  removeOneEnt(id: number): void {
    this.tagRepository.delete(id);
  }

  async removeOneTagEnt(id: number): Promise<void> {
    const tag: TagEntity = await this.tagRepository.findOneBy({ id: id });

    this.tagRepository.remove(tag);
  }
}
