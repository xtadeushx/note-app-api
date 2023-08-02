import { Module } from '@nestjs/common';
import { NotesService } from './notes/notes.service';
import { NotesController } from './notes/notes.controller';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
