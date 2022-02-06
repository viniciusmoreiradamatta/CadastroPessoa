namespace CadastroPessoa
{
    public interface IUnitOfWork
    {
        Task SaveChanges();
    }
}