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

  update(id: number, tag: UpdateTagDto|UpdateTagInput): Tag {
    const updatedTag: Tag = { id, ...tag };

    this.tags[this.tags.findIndex(tag => tag.id === id)] = updatedTag;

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
