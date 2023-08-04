import {
  Controller,
  Get,
  Patch,
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
    try {
      const items = await this.noteService.findAll();
      return items || [];
    } catch (error) {
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
    try {
      const item = await this.noteService.findOne(id);
      if (!item) {
        throw new Error();
      } else {
        return item;
      }
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.NOTE_NOTFOUND);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    try {
      const newNote = await this.noteService.createNote(createNoteDto);
      return newNote;
    } catch (error) {
      throw new BadRequestException(ExceptionMessage.SERVER_ERROR);
    }
  }

  @Delete(NotesApiPath.$ID)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedNote = await this.noteService.deleteNoteById(id);
      if (!deletedNote) throw new Error();
      res
        .status(HttpStatus.OK)
        .send({ message: `Note with ${id} deleted successfully` });
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.NOTE_NOTFOUND);
    }
  }

  @UsePipes(new ValidationPipe())
  @Patch(NotesApiPath.$ID)
  async update(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    try {
      const newNote = await this.noteService.updateNote(id, updateNote);
      if (!newNote) throw new Error();
      return newNote;
    } catch (error) {
      throw new BadRequestException(ExceptionMessage.NOT_NOTFOUND_BY_ID);
    }
  }
}
