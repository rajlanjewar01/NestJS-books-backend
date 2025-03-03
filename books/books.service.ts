import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
	private readonly logger = new Logger(BooksService.name);

	constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

	findAll() {
		return this.bookRepo.find();
	}

	findOne(id: number) {
		return this.bookRepo.findOne({ where: { id } });
	}

	async create(createBookDto: CreateBookDto) {
		const book = this.bookRepo.create(createBookDto);
		const savedBook = await this.bookRepo.save(book);
		this.logger.log(`Book created: ${savedBook.id} - ${savedBook.title} by ${savedBook.author}`);
		return savedBook;
	}

	async update(id: number, updateBookDto: UpdateBookDto) {
		await this.bookRepo.update(id, updateBookDto);
		const updatedBook = await this.bookRepo.findOne({ where: { id } });
		this.logger.log(`Book updated: ${id} - ${updatedBook?.title} by ${updatedBook?.author}`);
		return updatedBook;
	}

	async delete(id: number) {
		await this.bookRepo.delete(id);
		this.logger.log(`Book deleted: ID ${id}`);
		return { message: `Book with ID ${id} deleted successfully` };
	}
}
