import { Injectable } from '@nestjs/common';
import { TagEntity } from '../../models/tag/tag.entity';
import { TagRequest } from '../../requests/tag.request';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TagGqlDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAllTags(): Promise<TagEntity[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  findOneTag(id: number): Promise<TagEntity> {
    return this.repositoryService.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  createTag(tag: TagRequest): Promise<TagEntity> {
    const newTag: TagRequest = this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async updateTag(id: number, tag: TagRequest): Promise<TagEntity> {
    await this.repositoryService.tagRepository.preload({
      id: id,
      ...tag
    });

    return this.repositoryService.tagRepository.save(tag);
  }

  async removeAllTags(): Promise<void> {
    const tags: TagEntity[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.delete(tag.id));
  }

  async removeOneTag(id: number): Promise<void> {
    const tag: TagEntity = await this.repositoryService.tagRepository.findOneBy({ id: id });

    this.repositoryService.tagRepository.remove(tag);
  }
}
