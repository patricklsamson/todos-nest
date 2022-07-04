import { TagDbResolver } from "../resolvers/tag/tagDb.resolver";
import { TagNoDbResolver } from "../resolvers/tag/tagNoDb.resolver";
import { RepositoryService } from "../services/repository.service";
import { TagDbService } from "../services/tag/tagDb.service";
import { TagGqlDbService } from "../services/tag/tagGqlDb.service";
import { TagGqlNoDbService } from "../services/tag/tagGqlNoDb.service";
import { TagNoDbService } from "../services/tag/tagNoDb.service";

const tagProviders: any[] = [
  RepositoryService,
  TagDbResolver,
  TagDbService,
  TagGqlDbService,
  TagGqlNoDbService,
  TagNoDbResolver,
  TagNoDbService
];

export default tagProviders;
