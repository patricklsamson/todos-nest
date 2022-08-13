import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-errors';
import { Tag } from '../../models/tag/tag.entity';
import { CreateTagInput } from '../../requests/tag/create-tag.input';
import { UpdateTagInput } from '../../requests/tag/update-tag.input';
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
    const tag: Tag = this.tagService.findOne(id);

    if (!tag) throw new UserInputError('Invalid argument');

    return tag;
  }

  @Mutation(() => Tag)
  createTag(@Args('tag') tag: CreateTagInput): Tag {
    return this.tagService.create(tag);
  }

  @Mutation(() => Tag)
  updateTag(@Args('tag') tag: UpdateTagInput): Tag|boolean {
    const updatedTodo: Tag|boolean = this.tagService.update(tag.id, tag);

    if (!updatedTodo) throw new UserInputError('Invalid argument');

    return updatedTodo;
  }

  @Mutation(() => Boolean)
  removeAllTags(): boolean {
    return this.tagService.removeAll();
  }

  @Mutation(() => Boolean)
  removeOneTag(@Args('id', ParseIntPipe) id: number): boolean {
    const success: boolean = this.tagService.removeOne(id);

    if (!success) throw new UserInputError('Invalid argument');

    return success;
  }
}
