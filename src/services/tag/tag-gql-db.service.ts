import { Injectable } from '@nestjs/common';
import { TagDb } from '../../models/tag/tag-db.entity';
import { RepositoryIndex } from '../../repositories/repository.index';
import { CreateTagInput } from '../../requests/tag/create-tag.input';
import { UpdateTagInput } from '../../requests/tag/update-tag.input';

@Injectable()
export class TagGqlDbService {
  constructor(private repositoryIndex: RepositoryIndex) {}

  findAllTags(): Promise<TagDb[]> {
    return this.repositoryIndex.tagRepository.find({
      relations: ['todo']
    });
  }

  findOneTag(id: number): Promise<TagDb> {
    return this.repositoryIndex.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  createTag(tag: CreateTagInput): Promise<TagDb> {
    const newTag: CreateTagInput = this.repositoryIndex.tagRepository.create(tag);

    return this.repositoryIndex.tagRepository.save(newTag);
  }

  async updateTag(id: number, tag: UpdateTagInput): Promise<TagDb> {
    await this.repositoryIndex.tagRepository.update(id, tag);

    return this.repositoryIndex.tagRepository.findOneBy({ id: id });
  }

  async removeAllTags(): Promise<boolean> {
    const tags: TagDb[] = await this.repositoryIndex.tagRepository.find();

    tags.forEach(tag => this.repositoryIndex.tagRepository.delete(tag.id));

    return true;
  }

  async removeOneTag(id: number): Promise<boolean> {
    const tag: TagDb = await this.repositoryIndex.tagRepository.findOneBy({ id: id });

    this.repositoryIndex.tagRepository.remove(tag);

    return true;
  }
}
