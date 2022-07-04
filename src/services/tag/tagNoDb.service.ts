import { Tag } from "../../models/tag.entity";

export class TagNoDbService {
  public tags: Tag[] = [];

  findAll(): Tag[] {
    return this.tags;
  }

  findOne(id: number): Tag {
    return this.tags.find(tag => tag.id === id);
  }

  create(tag: Tag): Tag {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  update(id: number, tag: Tag): Tag {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    const updateTag: Tag = {
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
