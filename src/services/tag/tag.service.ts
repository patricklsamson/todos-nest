import { Tag } from "../../models/tag/tag.entity";
import { TagDto } from "../../requests/tag/tag.dto";

export class TagService {
  public tags: Tag[] = [];

  findAll(): Tag[] {
    return this.tags;
  }

  findOne(id: number): Tag {
    return this.tags.find(tag => tag.id === id);
  }

  create(tag: TagDto): Tag {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  update(id: number, tag: TagDto): Tag {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    const updatedTag: Tag = {
      id,
      ...tag
    };

    this.tags[index] = updatedTag;

    return updatedTag;
  }

  removeAll(): void {
    this.tags = [];
  }

  removeOne(id: number): void {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    this.tags.splice(index, 1);
  }
}
