import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TagEntity } from "../models/tag/tag.entity";
import { TodoEntity } from "../models/todo/todo.entity";

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(TagEntity) public tagRepository: Repository<TagEntity>,
    @InjectRepository(TodoEntity) public todoRepository: Repository<TodoEntity>
  ) {}
}
