import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagEntity } from './models/tag/tag.entity';
import { TodoEntity } from './models/todo/todo.entity';
import { TagModule } from './modules/tag.module';
import { TodoModule } from './modules/todo.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './db/schema.gql'),
      debug: true,
      playground: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [TagEntity, TodoEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TagModule,
    TodoModule,
    SampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
