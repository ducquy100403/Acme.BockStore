import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, BookDto } from '@proxy/books';
import { SharedModule } from "../shared/shared.module";
import { ThemeSharedModule } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, SharedModule,ThemeSharedModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: BookDto[] = [];

  constructor(private readonly bookService: BookService) {}

  ngOnInit() {
    this.bookService.getList().subscribe(response => {
      this.books = response; 
    });
  }
}
