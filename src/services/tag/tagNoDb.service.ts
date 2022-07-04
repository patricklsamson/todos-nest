import { TagDto } from "../../models/tag/tag.dto";

export class TagNoDbService {
  public tags: TagDto[] = [];

  findAll(): TagDto[] {
    return this.tags;
  }

  findOne(id: number): TagDto {
    return this.tags.find(tag => tag.id === id);
  }

  create(tag: TagDto): TagDto {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  update(id: number, tag: TagDto): TagDto {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    const updateTag: TagDto = {
      ...tag,
      id
    };

    this.tags[index] = updateTag;

    return updateTag;
  }

  removeAll(): void {
    this.tags = [];
  }

  removeOne(id: number): void {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    this.tags.splice(index, 1);
  }
}
