import { NotesModule } from './notes/notes.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NotesModule],
})
export class AppModule {}
