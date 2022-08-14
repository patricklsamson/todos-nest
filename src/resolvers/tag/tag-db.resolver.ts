import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagDbInput } from '../../requests/tag/create-tag-db.input';
import { UpdateTagInput } from '../../requests/tag/update-tag.input';
import { TagGqlDbService } from '../../services/tag/tag-gql-db.service';

@Resolver(() => TagDb)
export class TagDbResolver {
  constructor(private tagService: TagGqlDbService) {}

  @Query(() => [TagDb], { name: 'dbTags' })
  findAllDbTags(): Promise<TagDb[]> {
    return this.tagService.findAll();
  }

  @Query(() => TagDb, { name: 'dbTag' })
  findOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<TagDb> {
    return this.tagService.findOne(id);
  }

  @Mutation(() => TagDb)
  createDbTag(@Args('tag') tag: CreateTagDbInput): Promise<TagDb> {
    return this.tagService.create(tag);
  }

  @Mutation(() => TagDb)
  updateDbTag(@Args('tag') tag: UpdateTagInput): Promise<TagDb> {
    return this.tagService.update(tag.id, tag);
  }

  @Mutation(() => Boolean)
  removeAllDbTags(): Promise<boolean> {
    return this.tagService.removeAll();
  }

  @Mutation(() => Boolean)
  removeOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.tagService.removeOne(id);
  }
}
