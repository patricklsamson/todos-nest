import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [TodoModule, SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
