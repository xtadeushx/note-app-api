import { IsString, Length, MinLength, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @MinLength(5, {
    message:
      'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20)
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  @Length(10, 20)
  content: string;
}
