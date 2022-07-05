import { TodoDbResolver } from '../resolvers/todo/todo-db.resolver';
import { TodoNoDbResolver } from '../resolvers/todo/todo.resolver';
import { RepositoryService } from '../services/repository.service';
import { TodoDbService } from '../services/todo/todo-db.service';
import { TodoGqlDbService } from '../services/todo/todo-gql-db.service';
import { TodoGqlService } from '../services/todo/todo-gql.service';
import { TodoService } from '../services/todo/todo.service';

const todoProviders: any[] = [
  RepositoryService,
  TodoDbResolver,
  TodoDbService,
  TodoGqlDbService,
  TodoGqlService,
  TodoNoDbResolver,
  TodoService
];

export default todoProviders;
