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
import { ExceptionMessage } from 'src/common/enums/enums';
import { Response } from 'express';

@Controller('notes')
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.noteService.findOne(id);
    if (!item) {
      throw new NotFoundException(ExceptionMessage.NOTE_NOTFOUND);
    } else {
      return item;
    }
  }

  @UsePipes(new ValidationPipe()) // Use ValidationPipe here
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    try {
      const newNote = this.noteService.createNote(createNoteDto);
      return newNote;
    } catch (error) {
      throw new BadRequestException('There is no id with such id', error);
    }
  }

  @Delete(':id')
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    return `This action updates a #${id} cat`;
  }
}
