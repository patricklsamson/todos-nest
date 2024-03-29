import { Injectable } from "@nestjs/common";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagDbInput } from "../../requests/tag/create-tag-db.input";
import { UpdateTagDto } from "../../requests/tag/update-tag.dto";
import { UpdateTagInput } from "../../requests/tag/update-tag.input";
import { RepositoryService } from "../repository.service";

@Injectable()
export class TagGqlDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<TagDb[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  findOne(id: number): Promise<TagDb> {
    return this.repositoryService.tagRepository.findOneOrFail({
      where: { id: id },
      relations: ['todo']
    });
  }

  create(tag: CreateTagDbInput): Promise<TagDb> {
    const newTag: CreateTagDbInput =
      this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async update(id: number, tag: UpdateTagDto|UpdateTagInput): Promise<TagDb> {
    await this.repositoryService.tagRepository.update(id, tag);

    return this.repositoryService.tagRepository.findOneByOrFail({ id: id });
  }

  async removeAll(): Promise<boolean> {
    const tags: TagDb[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.remove(tag));

    return true;
  }

  async removeOne(id: number): Promise<boolean> {
    const tag: TagDb =
      await this.repositoryService.tagRepository.findOneByOrFail({ id: id });

    this.repositoryService.tagRepository.remove(tag);

    return true;
  }
}