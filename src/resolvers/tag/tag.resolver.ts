import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../../models/tag/tag.entity';
import { CreateTagInput } from '../../requests/tag/create-tag.input';
import { UpdateTagInput } from '../../requests/tag/update-tag.input';
import { TagGqlService } from '../../services/tag/tag-gql.service';

@Resolver(() => Tag)
export class TagNoDbResolver {
  constructor(private tagService: TagGqlService) {}

  @Query(() => [Tag], { name: 'tags' })
  findAllTags(): Tag[] {
    return this.tagService.findAllTags();
  }

  @Query(() => Tag, { name: 'tag' })
  findOneTag(@Args('id', ParseIntPipe) id: number): Tag {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => Tag)
  createTag(@Args('tag') tag: CreateTagInput): Tag {
    return this.tagService.createTag(tag);
  }

  @Mutation(() => Tag)
  updateTag(@Args('id', ParseIntPipe) id: number, @Args('tag') tag: UpdateTagInput): Tag {
    return this.tagService.updateTag(id, tag);
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
