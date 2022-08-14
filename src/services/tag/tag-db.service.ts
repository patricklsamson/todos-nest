import { Injectable, NotFoundException } from "@nestjs/common";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagDbInput } from "../../requests/tag/create-tag-db.input";
import { UpdateTagDto } from "../../requests/tag/update-tag.dto";
import { UpdateTagInput } from "../../requests/tag/update-tag.input";
import { TagSerializer } from "../../serializers/tag.serializer";
import { RepositoryService } from "../repository.service";

@Injectable()
export class TagDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<TagDb[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  async findOne(id: number): Promise<TagDb> {
    try {
      const tag: TagDb =
        await this.repositoryService.tagRepository.findOneOrFail({
          where: { id: id },
          relations: ['todo']
        });

      return TagSerializer.serialize(tag);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(tag: CreateTagDbInput): Promise<TagDb> {
    const newTag: CreateTagDbInput =
      this.repositoryService.tagRepository.create(tag);

    return TagSerializer.serialize(
      await this.repositoryService.tagRepository.save(newTag)
    );
  }

  async update(id: number, tag: UpdateTagDto|UpdateTagInput): Promise<TagDb> {
    try {
      await this.repositoryService.tagRepository.update(id, tag);

      return TagSerializer.serialize(
        await this.repositoryService.tagRepository.findOneByOrFail({ id: id })
      );
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async removeAll(): Promise<object> {
    const tags: TagDb[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.remove(tag));

    return {
      data: {
        attributes: {
          success: true
        }
      }
    };
  }

  async removeOne(id: number): Promise<object> {
    try {
      const tag: TagDb =
        await this.repositoryService.tagRepository.findOneByOrFail({ id: id });

      this.repositoryService.tagRepository.remove(tag);

      return {
        data: {
          attributes: {
            success: true
          }
        }
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}