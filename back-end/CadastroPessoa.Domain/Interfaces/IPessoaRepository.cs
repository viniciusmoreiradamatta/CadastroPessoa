using CadastroPessoa.Entities;

namespace CadastroPessoa
{
    public interface IUnitOfWork
    {
        Task SaveChanges();
    }

    public interface IPessoaRepository : IUnitOfWork
    {
        void Remover(Pessoa pessoa);

        Task AdicionarPessoa(Pessoa pessoa);

        Task<Pessoa> ObterPessoaAlteracao(int id);

        Task<IEnumerable<Pessoa>> ObterTodasPessoas();
    }
}