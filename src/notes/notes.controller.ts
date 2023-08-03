import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpCode,
  Param,
  Body,
  Res,
  NotFoundException,
  BadRequestException,
  ConflictException,
  BadGatewayException,
  UsePipes,
  ValidationPipe,
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const item = this.noteService.deleteNoteById(id);
    console.log(item);
    if (!item) {
      throw new NotFoundException(ExceptionMessage.NOTE_NOTFOUND);
    } else {
      return `This action updates a #${id} cat`;
    }
  }
}
