using Microsoft.EntityFrameworkCore;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Repositories;
using Moq;
using System.Linq.Expressions;
using Xunit;

namespace ProvaTeste.Test
{
    public class IntEntity : BaseEntity<int>
    {
    }

    public class StringEntity : BaseEntity<string>
    {
    }

    public class GuidEntity : BaseEntity<Guid>
    {
    }

    public class DateTimeEntity : BaseEntity<DateTime>
    {
    }

    public class ApplicationBaseServiceTest
    {
        [Fact]
        public async Task ADD_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<IntEntity, int>>();

            var service = new Application.Services.BaseService<IntEntity, int>(repository);
            await service.Add(new IntEntity());

            //assert
            Mock.Get(repository).Verify(s => s.Add(It.IsAny<IntEntity>(), It.IsAny<int?>()), Times.Once());
        }

        [Fact]
        public async Task GETBYID_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<IntEntity, int>>();
            Mock.Get(repository)
                .Setup(s => s.GetById(It.IsAny<int>(), It.IsAny<int?>()))
                .ReturnsAsync(new IntEntity());

            var service = new Application.Services.BaseService<IntEntity, int>(repository);
            await service.GetById(1, null);

            //assert
            Mock.Get(repository).Verify(s => s.GetById(It.IsAny<int>(), It.IsAny<int?>()), Times.Once());
        }

        [Fact]
        public async Task DELETE_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<IntEntity, int>>();
            Mock.Get(repository)
                .Setup(s => s.GetById(It.IsAny<int>(), It.IsAny<int?>()))
                .ReturnsAsync(new IntEntity());

            var service = new Application.Services.BaseService<IntEntity, int>(repository);
            var entity = new IntEntity() { Id = 1 };
            await service.Delete(entity, null);

            //assert
            Mock.Get(repository).Verify(s => s.Delete(It.IsAny<IntEntity>(), It.IsAny<int?>(), It.IsAny<int?>()), Times.Once());
        }

        [Fact]
        public async Task UPDATE_INT_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<IntEntity, int>>();
            Mock.Get(repository)
                .Setup(s => s.GetById(It.IsAny<int>(), It.IsAny<int?>()))
                .ReturnsAsync(new IntEntity());

            var service = new Application.Services.BaseService<IntEntity, int>(repository);
            await service.Update(new IntEntity() { Id = 1 }, null);

            //assert
            Mock.Get(repository).Verify(s => s.Update(It.IsAny<IntEntity>(), It.IsAny<int?>(), It.IsAny<int?>()), Times.Once());
        }

        [Fact]
        public async Task UPDATE_STRING_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<StringEntity, string>>();
            Mock.Get(repository)
                .Setup(s => s.GetById(It.IsAny<string>(), It.IsAny<int?>()))
                .ReturnsAsync(new StringEntity());

            var service = new Application.Services.BaseService<StringEntity, string>(repository);
            await service.Update(new StringEntity() { Id = "1" }, null);

            //assert
            Mock.Get(repository).Verify(s => s.Update(It.IsAny<StringEntity>(), It.IsAny<int?>(), It.IsAny<int?>()), Times.Once());
        }

        [Fact]
        public async Task UPDATE_GUID_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<GuidEntity, Guid>>();
            Mock.Get(repository)
                .Setup(s => s.GetById(It.IsAny<Guid>(), It.IsAny<int?>()))
                .ReturnsAsync(new GuidEntity());

            var service = new Application.Services.BaseService<GuidEntity, Guid>(repository);
            await service.Update(new GuidEntity() { Id = Guid.NewGuid() }, null);

            //assert
            Mock.Get(repository).Verify(s => s.Update(It.IsAny<GuidEntity>(), It.IsAny<int?>(), It.IsAny<int?>()), Times.Once());
        }

        [Fact]
        public async Task UPDATE_DATETIME_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<DateTimeEntity, DateTime>>();
            Mock.Get(repository)
                .Setup(s => s.GetById(It.IsAny<DateTime>(), It.IsAny<int?>()))
                .ReturnsAsync(new DateTimeEntity());

            var service = new Application.Services.BaseService<DateTimeEntity, DateTime>(repository);
            await service.Update(new DateTimeEntity() { Id = DateTime.Now }, null);

            //assert
            Mock.Get(repository).Verify(s => s.Update(It.IsAny<DateTimeEntity>(), It.IsAny<int?>(), It.IsAny<int?>()), Times.Once());
        }

        public async IAsyncEnumerable<IntEntity> Teste()
        {
            await Task.Yield();
            yield return new IntEntity();
            yield return new IntEntity();
            yield return new IntEntity();
        }

        [Fact]
        public async Task LIST_SUCESS_TEST()
        {
            //arrange
            var repository = Mock.Of<IBaseRepository<IntEntity, int>>();
            Mock.Get(repository)
                .Setup(s => s.List(It.IsAny<Expression<Func<IntEntity, bool>>>(), It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(new List<IntEntity> 
                { 
                    new IntEntity(), 
                    new IntEntity(),
                    new IntEntity() 
                });
                
            Mock.Get(repository)
                .Setup(s => s.Count(It.IsAny<Expression<Func<IntEntity, bool>>>()))
                .ReturnsAsync(3);

            var service = new Application.Services.BaseService<IntEntity, int>(repository);
            var result = await service.List(null, 1, 10);

            //assert
            Assert.Equal(3, result.Items.Count);
            Assert.Equal(3, result.Total);
            Assert.Equal(1, result.Page);
            Assert.Equal(10, result.PageSize);
        }
    }
}
