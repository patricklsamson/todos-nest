import { Injectable } from "@nestjs/common";
import { Tag } from "../../models/tag/tag.entity";
import { TagDto } from "../../requests/tag/tag.dto";
import { TagInput } from "../../requests/tag/tag.input";

@Injectable()
export class TagService {
  public tags: Tag[] = [];

  findAll(): Tag[] {
    return this.tags;
  }

  findOne(id: number): Tag {
    return this.tags.find(tag => tag.id === id);
  }

  create(tag: TagDto|TagInput): Tag {
    this.tags = [
      ...this.tags,
      { id: this.tags.length + 1, ...tag }
    ];

    return tag;
  }

  update(id: number, tag: TagDto|TagInput): Tag {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    const updatedTag: Tag = {
      id,
      ...tag
    };

    this.tags[index] = updatedTag;

    return updatedTag;
  }

  removeAll(): boolean {
    this.tags = [];

    return true;
  }

  removeOne(id: number): boolean {
    this.tags = this.tags.filter(tag => tag.id !== id);

    return true;
  }
}
