import { Tag } from "../../models/tag/tag.entity";
import { CreateTagInput } from "../../requests/tag/create-tag.input";
import { UpdateTagInput } from "../../requests/tag/update-tag.input";

export class TagGqlService {
  public tags: Tag[] = [];

  findAllTags(): Tag[] {
    return this.tags;
  }

  findOneTag(id: number): Tag {
    return this.tags.find(tag => tag.id === id);
  }

  createTag(tag: CreateTagInput): Tag {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  updateTag(id: number, tag: UpdateTagInput): Tag {
    const index: number = this.tags.findIndex(todo => todo.id === id);

    const updatedTag: UpdateTagInput = {
      ...tag,
      id
    };

    this.tags[index] = updatedTag;

    return updatedTag;
  }

  removeAllTags(): void {
    this.tags = [];
  }

  removeOneTag(id: number): void {
    this.tags = this.tags.filter(tag => tag.id !== id);
  }
}
