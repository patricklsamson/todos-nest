import { TodoDbResolver } from '../resolvers/todo/todoDb.resolver';
import { TodoNoDbResolver } from '../resolvers/todo/todoNoDb.resolver';
import { RepositoryService } from '../services/repository.service';
import { TodoDbService } from '../services/todo/todoDb.service';
import { TodoGqlDbService } from '../services/todo/todoGqlDb.service';
import { TodoGqlNoDbService } from '../services/todo/todoGqlNoDb.service';
import { TodoNoDbService } from '../services/todo/todoNoDb.service';

const todoProviders: any[] = [
  RepositoryService,
  TodoDbResolver,
  TodoDbService,
  TodoGqlDbService,
  TodoGqlNoDbService,
  TodoNoDbResolver,
  TodoNoDbService
];

export default todoProviders;
