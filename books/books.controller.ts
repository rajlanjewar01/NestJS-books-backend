import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) {}

	@Get()
		findAll() {
		return this.booksService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.booksService.findOne(+id);
	}

  	@Post()
  	create(@Body() createBookDto: CreateBookDto) {
		return this.booksService.create(createBookDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
		return this.booksService.update(+id, updateBookDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.booksService.delete(+id);
	}
}
