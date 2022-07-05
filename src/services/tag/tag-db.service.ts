import { Injectable } from "@nestjs/common";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagDto } from "../../requests/tag/create-tag.dto";
import { UpdateTagDto } from "../../requests/tag/update-tag.dto";
import { RepositoryService } from "../repository.service";

@Injectable()
export class TagDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<TagDb[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  findOne(id: number): Promise<TagDb> {
    return this.repositoryService.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  create(tag: CreateTagDto): Promise<TagDb> {
    const newTag: CreateTagDto = this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async update(id: number, tag: UpdateTagDto): Promise<TagDb> {
    await this.repositoryService.tagRepository.update(id, tag);

    return this.repositoryService.tagRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const tags: TagDb[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.delete(tag.id));
  }

  removeOne(id: number): void {
    this.repositoryService.tagRepository.delete(id);
  }
}