import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, BookDto, bookTypeOptions, CreateUpdateBookDto } from '@proxy/books';
import { SharedModule } from "../shared/shared.module";
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, SharedModule, ThemeSharedModule, NgbDatepickerModule, ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
})
export class BooksComponent implements OnInit {
  books: BookDto[] = [];
  isModalOpen = false;
  bookTypes = bookTypeOptions;
  form!: FormGroup;
  selectedBook = {} as BookDto; 
  list: any;

  constructor(
    private readonly bookService: BookService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getList().subscribe(response => {
      // Nếu backend trả về PagedResultDto thì sửa lại response.items
      this.books = (response as any).items ?? response;
    });
  }

  createBook() {
    this.selectedBook = {} as BookDto;
    this.buildForm();
    this.isModalOpen = true;
  }

   editBook(id: string) {
    this.bookService.get(id).subscribe((book) => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

buildForm() {
  this.form = this.fb.group({
    name: [this.selectedBook?.name || '', Validators.required],
    type: [this.selectedBook?.type ?? null, Validators.required],
    publishDate: [
      this.selectedBook?.publishDate ? new Date(this.selectedBook.publishDate) : null,
      Validators.required,
    ],
    price: [this.selectedBook?.price ?? null, Validators.required],
  });
}


  save() {
  if (this.form.invalid) return;

  const dto: CreateUpdateBookDto = {
    ...this.form.value,
    publishDate: (this.form.value.publishDate as Date)?.toISOString(),
  };

  const request = this.selectedBook?.id
    ? this.bookService.update(this.selectedBook.id, dto)
    : this.bookService.create(dto);

  request.subscribe(() => {
    this.isModalOpen = false;
    this.form.reset();
    this.loadBooks(); // reload lại danh sách
  });
}

}
