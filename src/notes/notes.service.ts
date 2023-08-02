import { Injectable } from '@nestjs/common';
import { INote } from './interface/note.interface';
import { DATA } from 'src/model/note-list';

@Injectable()
export class NotesService {
  private readonly notesList: INote[] = [...DATA];
  findAll(): INote[] {
    return this.notesList;
  }
  create(note: INote) {
    this.notesList.push(note);
  }
  createNote(note: INote): INote {
    this.notesList.push(note);
    return note;
  }
  findOne(id: string): INote {
    return this.notesList.find((note) => note.id === id);
  }
}
