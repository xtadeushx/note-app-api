import { INote } from 'src/notes/interface/note.interface';
import { NotesStatus } from '../common/enums/notes-status';

export interface TCategoryCounts {
  category: string;
  archived: number;
  active: number;
}

function countItemsByCategoryStatus(notesList: INote[]) {
  const categoryCounts: { [category: string]: TCategoryCounts } = {};

  notesList.forEach((note) => {
    const { category, status } = note;

    if (!categoryCounts[category]) {
      categoryCounts[category] = { category, archived: 0, active: 0 };
    }

    if (status === NotesStatus.ARCHIVED) {
      categoryCounts[category].archived++;
    } else if (status === NotesStatus.ACTIVE) {
      categoryCounts[category].active++;
    }
  });

  return Object.values(categoryCounts);
}

export { countItemsByCategoryStatus };
