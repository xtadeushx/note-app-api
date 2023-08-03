import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { INote } from './interface/note.interface';
import { DATA } from 'src/model/note-list';
import { CreateNoteDto } from './dto/create-note.dto';
import { formatDateLong } from 'src/utils/date-helper';
import { IconsSrc } from 'src/common/enums/icons-src';
import { NotesStatus } from 'src/common/enums/notes-status';

type IconsSrcType = keyof typeof IconsSrc;

@Injectable()
export class NotesService {
  private notesList: INote[] = [...DATA];

  findAll(): INote[] {
    return this.notesList;
  }

  findOne(id: string): INote {
    return this.notesList.find((note) => note.id === id);
  }

  createNote(note: CreateNoteDto) {
    const newNote: INote = {
      id: uuidv4(),
      title: note.title,
      src: IconsSrc[note.category as IconsSrcType] || IconsSrc.TASK,
      category: note.category,
      createdAt: formatDateLong(new Date(Date.now())),
      content: [note.content],
      status: NotesStatus.ACTIVE,
      dates: [],
    };
    this.notesList.push(newNote);
    return newNote;
  }

  deleteNoteById(id: string): INote | undefined {
    const noteIndex = this.notesList.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return undefined;
    }
    const deletedNote = this.notesList.splice(noteIndex, 1)[0];
    return deletedNote;
  }
}
