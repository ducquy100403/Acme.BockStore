using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Books
{
    [RemoteService(false)]
    public class BookAppService : ApplicationService, IBookAppService
    {
        private readonly IRepository<Book, Guid> _bookRepository;
        public BookAppService(IRepository<Book, Guid> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<BookDto> CreateAsync(CreateUpdateBookDto input)
        {
            var book = new Book(
                 GuidGenerator.Create(),   // Tạo id
                 input.Name,
                 input.Type,
                 input.PublishDate,
                 input.Price
             );

            await _bookRepository.InsertAsync(book, autoSave: true);

            return ObjectMapper.Map<Book, BookDto>(book);
        }

        public async Task DeleteAsync(Guid id)
        { 
            await _bookRepository.DeleteAsync(id);
        }

        public async Task<BookDto> GetAsync(Guid id)
        {
            var book = await _bookRepository.GetAsync(id);
            return ObjectMapper.Map<Book, BookDto>(book);
        }

        public async Task<List<BookDto>> GetListAsync()
        {
            var books = await _bookRepository.GetListAsync();
            return ObjectMapper.Map<List<Book>, List<BookDto>>(books);
        }

        public async Task<BookDto> UpdateAsync(Guid id, CreateUpdateBookDto input)
        {
            var book = await _bookRepository.GetAsync(id);

            book.Name = input.Name;
            book.Type = input.Type;
            book.PublishDate = input.PublishDate;
            book.Price = input.Price;

            await _bookRepository.UpdateAsync(book, autoSave: true);

            return ObjectMapper.Map<Book, BookDto>(book);
        }
    }
}
