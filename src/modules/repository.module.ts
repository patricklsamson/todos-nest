import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "../models/index.entity";
import { RepositoryService } from "../services/repository.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(entities)
  ],
  providers: [RepositoryService],
  exports: [RepositoryService]
})
export class RepositoryModule {}
