import { IsString, Length, MinLength, MaxLength } from 'class-validator';

export class UpdateNoteDto {
  @MinLength(5)
  @MaxLength(20)
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  @Length(10, 20)
  content: string;
}
