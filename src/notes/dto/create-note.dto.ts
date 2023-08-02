export class CreateNoteDto {
  id: string;
  src: string;
  title: string;
  createdAt: string;
  category: string;
  content: string[];
  dates: string[];
  status: TStatus;
}

export type TStatus = 'active' | 'archived';
