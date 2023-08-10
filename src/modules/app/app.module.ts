import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from '../../configurations';
import { NotesController } from '../notes/notes.controller';
import { NotesService } from '../notes/notes.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
