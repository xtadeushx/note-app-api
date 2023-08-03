import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpCode,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ExceptionMessage } from 'src/common/enums/enums';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async findAll() {
    try {
      await this.noteService.findAll();
    } catch (error) {
      throw new BadRequestException(ExceptionMessage.UNKNOWN_ERROR);
    }
  }

  @Post()
  @HttpCode(204)
  create(@Body() CreateNoteDto: CreateNoteDto) {
    return this.noteService.createNote(CreateNoteDto);
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
