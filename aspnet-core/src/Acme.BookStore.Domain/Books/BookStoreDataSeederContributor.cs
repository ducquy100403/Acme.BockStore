using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Acme.BookStore.Books;

namespace Acme.BookStore
{
    public class BookStoreDataSeederContributor
        : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Book, Guid> _bookRepository;

        public BookStoreDataSeederContributor(IRepository<Book, Guid> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            if (await _bookRepository.GetCountAsync() > 0)
            {
                return;
            }

            await _bookRepository.InsertAsync(
                new Book(
                    id: Guid.NewGuid(),
                    name: "1984",
                    type: BookType.Dystopia,
                    publishDate: new DateTime(1949, 6, 8),
                    price: 19.84f
                ),
                autoSave: true
            );

            await _bookRepository.InsertAsync(
                new Book(
                    id: Guid.NewGuid(),
                    name: "The Hobbit",
                    type: BookType.Fantastic,
                    publishDate: new DateTime(1937, 9, 21),
                    price: 10.99f
                ),
                autoSave: true
            );
        }
    }
}
