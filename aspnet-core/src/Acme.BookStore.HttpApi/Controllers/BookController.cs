using Acme.BookStore.Books;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;

namespace Acme.BookStore.Controllers.Books
{
    [RemoteService]
    [Area("app")]
    [ControllerName("Book")]
    [Route("api/app/books")]
    public class BookController : AbpController, IBookAppService
    {
        private readonly IBookAppService _bookAppService;

        public BookController(IBookAppService bookAppService)
        {
            _bookAppService = bookAppService;
        }

        [HttpGet("{id}")]
        public Task<BookDto> GetAsync(Guid id)
        {
            return _bookAppService.GetAsync(id);
        }

        [HttpGet]
        public Task<List<BookDto>> GetListAsync()
        {
            return _bookAppService.GetListAsync();
        }

        [HttpPost]
        public Task<BookDto> CreateAsync(CreateUpdateBookDto input)
        {
            return _bookAppService.CreateAsync(input);
        }

        [HttpPut("{id}")]
        public Task<BookDto> UpdateAsync(Guid id, CreateUpdateBookDto input)
        {
            return _bookAppService.UpdateAsync(id, input);
        }

        [HttpDelete("{id}")]
        public Task DeleteAsync(Guid id)
        {
            return _bookAppService.DeleteAsync(id);
        }
    }
}
