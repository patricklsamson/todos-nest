import { Injectable } from "@nestjs/common";
import { TagDto } from '../../models/tag/tag.dto';
import { RepositoryService } from "../repository.service";

@Injectable()
export class TagDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<TagDto[]> {
    return this.repositoryService.tagRepository.find({
      relations: ['todo']
    });
  }

  findOne(id: number): Promise<TagDto> {
    return this.repositoryService.tagRepository.findOne({
      where: { id: id },
      relations: ['todo']
    });
  }

  create(tag: TagDto): Promise<TagDto> {
    const newTag: TagDto = this.repositoryService.tagRepository.create(tag);

    return this.repositoryService.tagRepository.save(newTag);
  }

  async update(id: number, tag: TagDto): Promise<TagDto> {
    await this.repositoryService.tagRepository.update(id, tag);

    return this.repositoryService.tagRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const tags: TagDto[] = await this.repositoryService.tagRepository.find();

    tags.forEach(tag => this.repositoryService.tagRepository.delete(tag.id));
  }

  removeOne(id: number): void {
    this.repositoryService.tagRepository.delete(id);
  }
}