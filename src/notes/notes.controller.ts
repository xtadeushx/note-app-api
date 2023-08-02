import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Req,
  HttpCode,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Request } from 'express';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { INote } from './interface/note.interface';

@Controller('notes')
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
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.noteService.findOne(id);
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
