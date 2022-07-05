import { TagDbResolver } from "../resolvers/tag/tag-db.resolver";
import { TagNoDbResolver } from "../resolvers/tag/tag.resolver";
import { RepositoryService } from "../services/repository.service";
import { TagDbService } from "../services/tag/tag-db.service";
import { TagGqlDbService } from "../services/tag/tag-gql-db.service";
import { TagGqlService } from "../services/tag/tag-gql.service";
import { TagService } from "../services/tag/tag.service";

const tagProviders: any[] = [
  RepositoryService,
  TagDbResolver,
  TagDbService,
  TagGqlDbService,
  TagGqlService,
  TagNoDbResolver,
  TagService
];

export default tagProviders;
