import { Tag } from "../../models/tag/tag.entity";
import { TagInput } from "../../requests/tag/tag.input";

export class TagGqlService {
  public tags: Tag[] = [];

  findAllTags(): Tag[] {
    return this.tags;
  }

  findOneTag(id: number): Tag {
    return this.tags.find(tag => tag.id === id);
  }

  createTag(tag: TagInput): Tag {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  updateTag(id: number, tag: TagInput): Tag {
    const index: number = this.tags.findIndex(todo => todo.id === id);

    const updatedTag: TagInput = {
      ...tag,
      id
    };

    this.tags[index] = updatedTag;

    return updatedTag;
  }

  removeAllTags(): boolean {
    this.tags = [];

    return true;
  }

  removeOneTag(id: number): boolean {
    this.tags = this.tags.filter(tag => tag.id !== id);

    return true;
  }
}
