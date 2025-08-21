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
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
      publishDate: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
    });
  }

  save() {
    if (this.form.invalid) return;

    const input = this.form.value as CreateUpdateBookDto;
    this.bookService.create(input).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.loadBooks(); // refresh list sau khi thêm
    });
  }
}
