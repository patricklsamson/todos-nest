import { Injectable } from "@nestjs/common";
import { Tag } from "../../models/tag/tag.entity";
import { CreateTagInput } from "../../requests/tag/create-tag.input";
import { UpdateTagDto } from "../../requests/tag/update-tag.dto";
import { UpdateTagInput } from "../../requests/tag/update-tag.input";

@Injectable()
export class TagService {
  public tags: Tag[] = [];

  findAll(): Tag[] {
    return this.tags;
  }

  findOne(id: number): Tag {
    return this.tags.find(tag => tag.id === id);
  }

  create(tag: CreateTagInput): Tag {
    const newTag: Tag = { id: this.tags.length + 1, ...tag };

    this.tags.push(newTag);

    return newTag;
  }

  update(id: number, tag: UpdateTagDto|UpdateTagInput): Tag|boolean {
    const index: number = this.tags.findIndex(tag => tag.id === id);

    if (index === -1) return false;

    const updatedTag: Tag = { id, ...tag };

    this.tags[index] = updatedTag;

    return updatedTag;
  }

  removeAll(): boolean {
    this.tags = [];

    return true;
  }

  removeOne(id: number): boolean {
    if (this.tags.findIndex(tag => tag.id === id) === -1) return false;

    this.tags = this.tags.filter(tag => tag.id !== id);

    return true;
  }
}
