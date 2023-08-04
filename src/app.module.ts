import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NotesService } from './notes/notes.service';
import { NotesController } from './notes/notes.controller';
import { CheckBodyFieldsMiddleware } from './common/middleware/check-body-fields';
import { NotesApiPath } from './common/enums/notes-api-path';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckBodyFieldsMiddleware).forRoutes(NotesApiPath.NOTES);
  }
}
