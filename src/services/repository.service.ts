import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../models/tag.entity";
import { Todo } from "../models/todo.entity";

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(Tag) public tagRepository: Repository<Tag>,
    @InjectRepository(Todo) public todoRepository: Repository<Todo>
  ) {}
}
