import { IsString, MinLength, MaxLength, Contains } from 'class-validator';
import { IsAllowedContent } from '../../decorators/is-allowed-content';

export class UpdateNoteDto {
  @MinLength(0)
  @MaxLength(20)
  @IsString()
  title: string;

  @IsString()
  @IsAllowedContent()
  category: string;

  @IsString()
  content: string;
}
