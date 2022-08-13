import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TagDb } from "../../models/tag/tag-db.entity";
import { CreateTagInput } from '../../requests/tag/create-tag.input';
import { UpdateTagInput } from '../../requests/tag/update-tag.input';
import { TagDbService } from '../../services/tag/tag-db.service';

@Resolver(() => TagDb)
export class TagDbResolver {
  constructor(private tagService: TagDbService) {}

  @Query(() => [TagDb], { name: 'dbTags' })
  findAllDbTags(): Promise<TagDb[]> {
    return this.tagService.findAll();
  }

  @Query(() => TagDb, { name: 'dbTag' })
  findOneDbTag(@Args('id', ParseIntPipe) id: number): Promise<TagDb> {
    return this.tagService.findOne(id);
  }

  @Mutation(() => TagDb)
  createDbTag(@Args('tag') tag: CreateTagInput): Promise<TagDb> {
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
