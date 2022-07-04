import { TagEntity } from "../../models/tag/tag.entity";
import { TagRequest } from "../../requests/tag.request";

export class TagGqlNoDbService {
  public tags: TagEntity[] = [];

  findAllTags(): TagEntity[] {
    return this.tags;
  }

  findOneTag(id: number): TagEntity {
    return this.tags.find(tag => tag.id === id);
  }

  createTag(tag: TagRequest): TagEntity {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  updateTag(tagEntry: TagRequest): TagEntity|any {
    this.tags = this.tags.map(tag => {
      if (tag.id === tagEntry.id) {
        return { ...tagEntry };
      }

      return tag;
    });
  }

  removeAllTags(): void {
    this.tags = [];
  }

  removeOneTag(id: number): void {
    this.tags = this.tags.filter(tag => tag.id !== id);
  }
}
