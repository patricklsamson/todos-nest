import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TagDb } from "../models/tag/tag-db.entity";
import { TodoDb } from "../models/todo/todo-db.entity";

@Injectable()
export class IndexRepository {
  constructor(
    @InjectRepository(TagDb) public tagRepository: Repository<TagDb>,
    @InjectRepository(TodoDb) public todoRepository: Repository<TodoDb>
  ) {}
}
