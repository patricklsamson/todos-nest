import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import indexEntity from "../models/index.entity";
import { IndexRepository } from "../repositories/index.repository";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(indexEntity)],
  providers: [IndexRepository],
  exports: [IndexRepository]
})
export class RepositoryModule {}
