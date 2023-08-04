import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NotesApiPath } from 'src/common/enums/notes-api-path';
import { CheckBodyFieldsMiddleware } from 'src/middleware/check-body-fields';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckBodyFieldsMiddleware).forRoutes(NotesApiPath.NOTES);
  }
}
