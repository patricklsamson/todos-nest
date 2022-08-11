import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import indexEntity from './models/index.entity';
import indexModule from './modules/index.module';
// import { SampleModule } from './sample/sample.module';
// import { SampleGqlModule } from './sample-gql/sample-gql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schemas/schema.gql'),
      path: 'v1/gql',
      debug: true,
      playground: true,
      formatError: (error: ApolloError|GraphQLError) => {
        return {
          code: error.extensions.code,
          name: error.extensions?.response?.error || error.extensions.code,
          message: error.extensions?.response?.message || [error.message]
        }
      }
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
        entities: indexEntity,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ...indexModule,
    // SampleGqlModule,
    // SampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
