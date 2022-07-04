import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagEntity } from '../../models/tag/tag.entity';
import { TagRequest } from '../../requests/tag.request';
import { TagGqlNoDbService } from '../../services/tag/tagGqlNoDb.service';

@Resolver(() => TagEntity)
export class TagNoDbResolver {
  constructor(private tagService: TagGqlNoDbService) {}

  @Query(() => [TagEntity], { name: 'tags' })
  findAllTags(): TagEntity[] {
    return this.tagService.findAllTags();
  }

  @Query(() => TagEntity, { name: 'tag' })
  findOneTag(@Args('id', ParseIntPipe) id: number): TagEntity {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => TagEntity)
  createTag(@Args('tag') tag: TagRequest): TagEntity {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => TagEntity)
  updateTag(@Args('tag') tag: TagRequest): TagEntity {
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
}
