import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../../models/tag/tag.entity';
import { TagInput } from '../../requests/tag/tag.input';
import { TagService } from '../../services/tag/tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => [Tag], { name: 'tags' })
  findAllTags(): Tag[] {
    return this.tagService.findAll();
  }

  @Query(() => Tag, { name: 'tag' })
  findOneTag(@Args('id', ParseIntPipe) id: number): Tag {
    return this.tagService.findOne(id);
  }

  @Mutation(() => Tag)
  createTag(@Args('tag') tag: TagInput): Tag {
    return this.tagService.create(tag);
  }

  @Mutation(() => Tag)
  updateTag(
    @Args('id', ParseIntPipe) id: number,
    @Args('tag') tag: TagInput
  ): Tag {
    return this.tagService.update(id, tag);
  }

  @Mutation(() => Boolean)
  removeAllTags(): boolean {
    return this.tagService.removeAll();
  }

  @Mutation(() => Boolean)
  removeOneTag(@Args('id', ParseIntPipe) id: number): boolean {
    return this.tagService.removeOne(id);
  }
}
