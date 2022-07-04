import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Tag } from "../../models/tag.entity";
import { TagRequest } from '../../requests/tag.request';
import { TagGqlDbService } from '../../services/tag/tagGqlDb.service';

@Resolver(() => Tag)
export class TagDbResolver {
  constructor(private tagService: TagGqlDbService) {}

  @Query(() => [Tag], { name: 'dbTags' })
  findAllDbTags(): Promise<Tag[]> {
    return this.tagService.findAllTags();
  }

  @Query(() => Tag, { name: 'dbTag' })
  findOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => Tag)
  createDbTag(@Args('tag') tag: TagRequest): Promise<Tag> {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => Tag)
  updateDbTag(@Args('tag') tag: TagRequest): Promise<Tag> {
    return this.tagService.updateTag(tag.id, tag);
  }

  @Mutation(() => Tag)
  removeAllDbTags(): Promise<void> {
    return this.tagService.removeAllTags();
  }

  @Mutation(() => Tag)
  removeOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagService.removeOneTag(id);
  }
}
