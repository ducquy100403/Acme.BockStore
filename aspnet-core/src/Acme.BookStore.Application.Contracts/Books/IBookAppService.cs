using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Books
{
    public interface IBookAppService : IApplicationService
    {
        Task<BookDto> GetAsync(Guid id);
        Task<List<BookDto>> GetListAsync();
        Task<BookDto> CreateAsync(CreateUpdateBookDto input);
        Task<BookDto> UpdateAsync(Guid id, CreateUpdateBookDto input);
        Task DeleteAsync(Guid id);
    }
}
