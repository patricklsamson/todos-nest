import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagEntity } from '../models/tag/tag.entity';
import { TagInput } from '../models/tag/tag.input';
import { TagService } from '../services/tag.service';

@Resolver(() => TagEntity)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [TagEntity], { name: 'tags' })
  findAllTags(): TagEntity[] {
    return this.tagService.findAllTags();
  }

  @Query(() => TagEntity, { name: 'tag' })
  findOneTag(@Args('id', ParseIntPipe) id: number): TagEntity {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => TagEntity)
  createTag(@Args('tag') tag: TagInput): TagEntity {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => TagEntity)
  updateTag(@Args('tag') tag: TagInput): TagEntity {
    return this.tagService.updateTag(tag);
  }

  @Mutation(() => TagEntity)
  removeAllTags(): void {
    return this.tagService.removeAllTags();
  }

  @Mutation(() => TagEntity)
  removeOneTag(@Args('id', ParseIntPipe) id: number): void {
    return this.tagService.removeOneTag(id);
  }

  @Query(() => [TagEntity], { name: 'tagEnts' })
  findAllTagEnts(): Promise<TagEntity[]> {
    return this.tagService.findAllTagEnts();
  }

  @Query(() => TagEntity, { name: 'tagEnt' })
  findOneTagEnt(@Args('id', ParseIntPipe) id: number): Promise<TagEntity> {
    return this.tagService.findOneTagEnt(id);
  }

  @Mutation(() => TagEntity)
  createTagEnt(@Args('tag') tag: TagInput): Promise<TagEntity> {
    return this.tagService.createTagEnt(tag);
  }

  @Mutation(() => TagEntity)
  updateTagEnt(@Args('tag') tag: TagInput): Promise<TagEntity> {
    return this.tagService.updateTagEnt(tag.id, tag);
  }

  @Mutation(() => TagEntity)
  removeAllTagEnts(): Promise<void> {
    return this.tagService.removeAllTagEnts();
  }

  @Mutation(() => TagEntity)
  removeOneTagEnt(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagService.removeOneTagEnt(id);
  }
}
