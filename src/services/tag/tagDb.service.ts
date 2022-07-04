import { Injectable } from "@nestjs/common";
import { Tag } from "../../models/tag.entity";
import { RepositoryService } from "../repository.service";

@Injectable()
export class TagDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<Tag[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  findOne(id: number): Promise<Tag> {
    return this.repositoryService.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  create(tag: Tag): Promise<Tag> {
    const newTag: Tag = this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async update(id: number, tag: Tag): Promise<Tag> {
    await this.repositoryService.tagRepository.update(id, tag);

    return this.repositoryService.tagRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const tags: Tag[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.delete(tag.id));
  }

  removeOne(id: number): void {
    this.repositoryService.tagRepository.delete(id);
  }
}