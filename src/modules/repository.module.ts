import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import indexEntity from "../models/index.entity";
import { RepositoryService } from "../services/repository.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(indexEntity)],
  providers: [RepositoryService],
  exports: [RepositoryService]
})
export class RepositoryModule {}
