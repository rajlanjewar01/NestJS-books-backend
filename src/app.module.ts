import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { Book } from '../books/entities/book.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite', // Change to 'postgres' or 'mysql' if needed
			database: 'books.db',
			entities: [Book],
			synchronize: true, // Auto-sync DB changes (use only in dev)
		}),
		BooksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
