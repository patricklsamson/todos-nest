import { Injectable } from "@nestjs/common";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagInput } from "../../requests/tag/create-tag.input";
import { UpdateTagInput } from "../../requests/tag/update-tag.input";
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

  create(tag: CreateTagInput): Promise<TagDb> {
    const newTag: CreateTagInput =
      this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async update(id: number, tag: UpdateTagInput): Promise<TagDb> {
    await this.repositoryService.tagRepository.update(id, tag);

    return this.repositoryService.tagRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<boolean> {
    const tags: TagDb[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.remove(tag));

    return true;
  }

  async removeOne(id: number): Promise<boolean> {
    const tag: TagDb = await this.repositoryService.tagRepository.findOneBy({
      id: id
    });

    await this.repositoryService.tagRepository.remove(tag);

    return true;
  }
}