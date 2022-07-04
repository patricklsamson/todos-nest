import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../../models/tag.entity';
import { TagRequest } from '../../requests/tag.request';
import { TagGqlNoDbService } from '../../services/tag/tagGqlNoDb.service';

@Resolver(() => Tag)
export class TagNoDbResolver {
  constructor(private tagService: TagGqlNoDbService) {}

  @Query(() => [Tag], { name: 'tags' })
  findAllTags(): Tag[] {
    return this.tagService.findAllTags();
  }

  @Query(() => Tag, { name: 'tag' })
  findOneTag(@Args('id', ParseIntPipe) id: number): Tag {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => Tag)
  createTag(@Args('tag') tag: TagRequest): Tag {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => Tag)
  updateTag(@Args('tag') tag: TagRequest): Tag {
    return this.tagService.updateTag(tag);
  }

  @Mutation(() => Tag)
  removeAllTags(): void {
    return this.tagService.removeAllTags();
  }

  @Mutation(() => Tag)
  removeOneTag(@Args('id', ParseIntPipe) id: number): void {
    return this.tagService.removeOneTag(id);
  }
}
