import { Injectable } from '@nestjs/common';
import { Tag } from '../../models/tag.entity';
import { TagRequest } from '../../requests/tag.request';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TagGqlDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAllTags(): Promise<Tag[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  findOneTag(id: number): Promise<Tag> {
    return this.repositoryService.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  createTag(tag: TagRequest): Promise<Tag> {
    const newTag: TagRequest = this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async updateTag(id: number, tag: TagRequest): Promise<Tag> {
    await this.repositoryService.tagRepository.preload({
      id: id,
      ...tag
    });

    return this.repositoryService.tagRepository.save(tag);
  }

  async removeAllTags(): Promise<void> {
    const tags: Tag[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.delete(tag.id));
  }

  async removeOneTag(id: number): Promise<void> {
    const tag: Tag = await this.repositoryService.tagRepository.findOneBy({ id: id });

    this.repositoryService.tagRepository.remove(tag);
  }
}
