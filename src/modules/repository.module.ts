import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "../models/index.entity";
import { RepositoryIndex } from "../repositories/repository.index";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(entities)
  ],
  providers: [RepositoryIndex],
  exports: [RepositoryIndex]
})
export class RepositoryModule {}
