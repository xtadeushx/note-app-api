import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { INote } from './interface/note.interface';
import { ApiPath } from 'src/common/enums/enums';

@Controller(ApiPath.NOTES)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async findAll(): Promise<INote[]> {
    return this.noteService.findAll();
  }

  @Post()
  create(@Body() CreateNoteDto: CreateNoteDto) {
    return this.noteService.createNote(CreateNoteDto);
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
