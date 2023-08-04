import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ExceptionMessage, NotesApiPath } from 'src/common/enums/enums';
import { Response } from 'express';

@Controller(NotesApiPath.NOTES)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async findAll() {
    const items = await this.noteService.findAll();
    if (items) {
      return items;
    } else {
      throw new BadRequestException(ExceptionMessage.UNKNOWN_ERROR);
    }
  }

  @Get(NotesApiPath.STATS)
  async returnStats() {
    try {
      return await this.noteService.countStats();
    } catch (error) {
      throw new BadRequestException(ExceptionMessage.UNKNOWN_ERROR);
    }
  }

  @Get(NotesApiPath.$ID)
  async findOne(@Param('id') id: string) {
    const item = await this.noteService.findOne(id);
    if (!item) {
      throw new NotFoundException(ExceptionMessage.NOTE_NOTFOUND);
    } else {
      return item;
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    try {
      const newNote = this.noteService.createNote(createNoteDto);
      return newNote;
    } catch (error) {
      throw new BadRequestException(ExceptionMessage.SERVER_ERROR, error);
    }
  }

  @Delete(NotesApiPath.$ID)
  remove(@Param('id') id: string, @Res() res: Response) {
    const deletedNote = this.noteService.deleteNoteById(id);
    if (!deletedNote) {
      throw new NotFoundException(ExceptionMessage.NOTE_NOTFOUND);
    } else {
      res
        .status(HttpStatus.OK)
        .send({ message: `Note with ${id} deleted successfully` });
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(NotesApiPath.$ID)
  update(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    try {
      const newNote = this.noteService.updateNote(id, updateNote);
      return newNote;
    } catch (error) {
      throw new BadRequestException(ExceptionMessage.NOT_NOTFOUND_BY_ID, error);
    }
  }
}
