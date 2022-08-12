import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagInput } from '../../requests/tag/create-tag.input';
import { UpdateTagInput } from '../../requests/tag/update-tag.input';
import { TagGqlDbService } from '../../services/tag/tag-gql-db.service';

@Resolver(() => TagDb)
export class TagDbResolver {
  constructor(private tagService: TagGqlDbService) {}

  @Query(() => [TagDb], { name: 'dbTags' })
  findAllDbTags(): Promise<TagDb[]> {
    return this.tagService.findAllTags();
  }

  @Query(() => TagDb, { name: 'dbTag' })
  findOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<TagDb> {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => TagDb)
  createDbTag(@Args('tag') tag: CreateTagInput): Promise<TagDb> {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => TagDb)
  updateDbTag(@Args('tag') tag: UpdateTagInput): Promise<TagDb> {
    return this.tagService.updateTag(tag.id, tag);
  }

  @Mutation()
  removeAllDbTags(): Promise<boolean> {
    return this.tagService.removeAllTags();
  }

  @Mutation()
  removeOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.tagService.removeOneTag(id);
  }
}
