using Microsoft.EntityFrameworkCore;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Exceptions;
using ProvaTeste.Infrastructure.Persistence.DbContexts;
using ProvaTeste.Infrastructure.Repositories;
using Moq;
using Xunit;

namespace ProvaTeste.Test;

public class TestEntity : BaseEntity<int>
{
}

public class InfrastructureBaseRepositoryTest
{
    [Fact]
    public async Task UPDATE_STRING_DEFAULT_FAIL_TEST()
    {
        var dbset = Mock
           .Of<DbSet<StringEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<StringEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<StringEntity, string>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Update(new StringEntity { Id = default }, null);
        });
    }

    [Fact]
    public async Task UPDATE_DATETIME_DEFAULT_FAIL_TEST()
    {
        var dbset = Mock
            .Of<DbSet<DateTimeEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<DateTimeEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<DateTimeEntity, DateTime>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Update(new DateTimeEntity() { Id = default }, null);
        });
    }

    [Fact]
    public async Task UPDATE_GUID_DEFAULT_FAIL_TEST()
    {
        //arrange
        var dbset = Mock
            .Of<DbSet<GuidEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<GuidEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<GuidEntity, Guid>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Update(new GuidEntity() { Id = default }, null);
        });
    }

    [Fact]
    public async Task UPDATE_INT_DEFAULT_FAIL_TEST()
    {
        //arrange
        var dbset = Mock
            .Of<DbSet<IntEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<IntEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<IntEntity, int>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Update(new IntEntity() { Id = default }, null);
        });
    }

    [Fact]
    public async Task DELETE_STRING_DEFAULT_FAIL_TEST()
    {
        var dbset = Mock
           .Of<DbSet<StringEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<StringEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<StringEntity, string>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Delete(new StringEntity { Id = default }, null);
        });
    }

    [Fact]
    public async Task DELETE_DATETIME_DEFAULT_FAIL_TEST()
    {
        var dbset = Mock
            .Of<DbSet<DateTimeEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<DateTimeEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<DateTimeEntity, DateTime>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Delete(new DateTimeEntity() { Id = default }, null);
        });
    }

    [Fact]
    public async Task DELETE_GUID_DEFAULT_FAIL_TEST()
    {
        //arrange
        var dbset = Mock
            .Of<DbSet<GuidEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<GuidEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<GuidEntity, Guid>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Delete(new GuidEntity() { Id = default }, null);
        });
    }

    [Fact]
    public async Task DELETE_INT_DEFAULT_FAIL_TEST()
    {
        //arrange
        var dbset = Mock
            .Of<DbSet<IntEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<IntEntity>())
            .Returns(dbset);

        //act
        var repository = new BaseRepository<IntEntity, int>(dbcontext);

        //assert
        var e = await Assert.ThrowsAsync<DomainException>(async () =>
        {
            await repository.Delete(new IntEntity() { Id = default }, null);
        });
    }

    [Fact]
    public async Task ADD_SUCESS_TEST()
    {
        //arrange
        var dbset = Mock
            .Of<DbSet<TestEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;
        Mock
            .Get(dbcontext)
            .Setup(s => s.Set<TestEntity>())
            .Returns(dbset);

        //act
        await new BaseRepository<TestEntity, int>(dbcontext)
            .Add(new TestEntity());

        //assert
        Mock
            .Get(dbcontext)
            .Verify(s => s.Set<TestEntity>(), Times.Once());
        Mock
            .Get(dbcontext)
            .Verify(s => s.SaveChangesAsync(CancellationToken.None), Times.Once());
        Mock
            .Get(dbset)
            .Verify(s => s.AddAsync(It.IsAny<TestEntity>(), CancellationToken.None), Times.Once());
    }

    //[Fact]
    //public async Task UPDATE_SUCCESS_TEST()
    //{
    //    //arrange
    //    var data = new List<TestEntity>
    //    {
    //        new TestEntity { Id = 1, Deleted = false }
    //    }.AsQueryable();

    //    var dbset = new Mock<DbSet<TestEntity>>();
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.Provider).Returns(data.Provider);
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.Expression).Returns(data.Expression);
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.ElementType).Returns(data.ElementType);
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

    //    var dbcontext = new Mock<ProvaTesteDbContext>(new DbContextOptions<ProvaTesteDbContext>())
    //        .Object;
    //    Mock.Get(dbcontext)
    //        .Setup(s => s.Set<TestEntity>())
    //        .Returns(dbset.Object);

    //    //act
    //    await new BaseRepository<TestEntity, int>(dbcontext)
    //        .Update(new TestEntity { Id = 1 }, null);

    //    //assert
    //    Mock.Get(dbcontext)
    //        .Verify(s => s.Set<TestEntity>(), Times.Once());
    //    Mock.Get(dbcontext)
    //        .Verify(s => s.SaveChangesAsync(CancellationToken.None), Times.Once());
    //    Mock.Get(dbset.Object)
    //        .Verify(s => s.Update(It.IsAny<TestEntity>()), Times.Once());
    //}

    //[Fact]
    //public async Task DELETE_SUCCESS_TEST()
    //{
    //    //arrange
    //    var data = new List<TestEntity>
    //    {
    //        new TestEntity { Id = 1, Deleted = false }
    //    }.AsQueryable();

    //    var dbset = new Mock<DbSet<TestEntity>>();
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.Provider).Returns(data.Provider);
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.Expression).Returns(data.Expression);
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.ElementType).Returns(data.ElementType);
    //    dbset.As<IQueryable<TestEntity>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

    //    var dbcontext = new Mock<ProvaTesteDbContext>(new DbContextOptions<ProvaTesteDbContext>())
    //        .Object;
    //    Mock.Get(dbcontext)
    //        .Setup(s => s.Set<TestEntity>())
    //        .Returns(dbset.Object);

    //    var entity = new TestEntity { Id = 1 };

    //    //act
    //    await new BaseRepository<TestEntity, int>(dbcontext)
    //        .Delete(entity, null);

    //    //assert
    //    Mock.Get(dbcontext)
    //        .Verify(s => s.Set<TestEntity>(), Times.Once());
    //    Mock.Get(dbcontext)
    //        .Verify(s => s.SaveChangesAsync(CancellationToken.None), Times.Once());
    //    Mock.Get(dbset.Object)
    //        .Verify(s => s.Update(It.Is<TestEntity>(e => e.Deleted == true)), Times.Once());
    //    Assert.True(entity.Deleted);
    //}

    //[Fact]
    //public async Task GETBYID_SUCCESS_TEST()
    //{
    //    //arrange
    //    var expectedObject = new TestEntity();
    //    var data = new List<TestEntity> { expectedObject }.AsQueryable();
        
    //    var dbset = Mock.Of<DbSet<TestEntity>>();
    //    var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
    //        .Object;
        
    //    Mock.Get(dbcontext)
    //        .Setup(s => s.Set<TestEntity>())
    //        .Returns(dbset);
    //    Mock
    //        .Get(dbset)
    //        .Setup(s => s.FindAsync(It.IsAny<object[]>()))
    //        .ReturnsAsync(expectedObject);

    //    //act
    //    var result = await new BaseRepository<TestEntity, int>(dbcontext)
    //        .GetById(1);

    //    //assert
    //    Mock.Get(dbcontext)
    //        .Verify(s => s.Set<TestEntity>(), Times.Once());
    //    Assert.Equal(expectedObject, result);
    //}

    [Fact]
    public async Task LIST_SUCESS_TEST()
    {
        //arrange
        var data = new List<TestEntity>
        {
            new TestEntity { Id = 1 },
            new TestEntity { Id = 2 },
            new TestEntity { Id = 3 }
        };

        var dbset = Mock
            .Of<DbSet<TestEntity>>();
        var dbcontext = new Mock<ProvaTesteDbContext>([new ContreteDbContextOptions()])
            .Object;

        Mock.Get(dbcontext)
            .Setup(s => s.Set<TestEntity>())
            .Returns(dbset);

        Mock.Get(dbset)
            .Setup(s => s.AsQueryable())
            .Returns(data.AsQueryable());

        //var list = await new BaseRepository<TestEntity, int>(dbcontext)
        //    .List()
        //    .ToListAsync();

        ////assert
        //Assert.Equal(3, list.Count);
    }
}
