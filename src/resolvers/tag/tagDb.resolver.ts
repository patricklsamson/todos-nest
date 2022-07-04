import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TagEntity } from "../../models/tag/tag.entity";
import { TagRequest } from '../../requests/tag.request';
import { TagGqlDbService } from '../../services/tag/tagGqlDb.service';

@Resolver(() => TagEntity)
export class TagDbResolver {
  constructor(private tagService: TagGqlDbService) {}

  @Query(() => [TagEntity], { name: 'dbTags' })
  findAllDbTags(): Promise<TagEntity[]> {
    return this.tagService.findAllTags();
  }

  @Query(() => TagEntity, { name: 'dbTag' })
  findOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<TagEntity> {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => TagEntity)
  createDbTag(@Args('tag') tag: TagRequest): Promise<TagEntity> {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => TagEntity)
  updateDbTag(@Args('tag') tag: TagRequest): Promise<TagEntity> {
    return this.tagService.updateTag(tag.id, tag);
  }

  @Mutation(() => TagEntity)
  removeAllDbTags(): Promise<void> {
    return this.tagService.removeAllTags();
  }

  @Mutation(() => TagEntity)
  removeOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagService.removeOneTag(id);
  }
}
