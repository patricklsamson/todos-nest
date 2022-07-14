import { Injectable } from "@nestjs/common";
import { TagDb } from "../../models/tag/tag-db.entity";
import { IndexRepository } from "../../repositories/index.repository";
import { CreateTagDto } from "../../requests/tag/create-tag.dto";
import { UpdateTagDto } from "../../requests/tag/update-tag.dto";

@Injectable()
export class TagDbService {
  constructor(private repositoryIndex: IndexRepository) {}

  findAll(): Promise<TagDb[]> {
    return this.repositoryIndex.tagRepository.find({
      relations: ['todo']
    });
  }

  findOne(id: number): Promise<TagDb> {
    return this.repositoryIndex.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  create(tag: CreateTagDto): Promise<TagDb> {
    const newTag: CreateTagDto = this.repositoryIndex.tagRepository.create(tag);

    return this.repositoryIndex.tagRepository.save(newTag);
  }

  async update(id: number, tag: UpdateTagDto): Promise<TagDb> {
    await this.repositoryIndex.tagRepository.update(id, tag);

    return this.repositoryIndex.tagRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const tags: TagDb[] = await this.repositoryIndex.tagRepository.find();

    tags.forEach(tag => this.repositoryIndex.tagRepository.delete(tag.id));
  }

  removeOne(id: number): void {
    this.repositoryIndex.tagRepository.delete(id);
  }
}