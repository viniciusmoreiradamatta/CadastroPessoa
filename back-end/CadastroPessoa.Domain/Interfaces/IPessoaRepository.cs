using CadastroPessoa.Entities;

namespace CadastroPessoa
{
    public interface IPessoaRepository : IUnitOfWork
    {
        void Remover(Pessoa pessoa);

        Task AdicionarPessoa(Pessoa pessoa);

        Task<Pessoa> ObterPessoaAlteracao(int id);

        Task<Pessoa> ObterPessoaJaCadastrada(string cpf);

        Task<IEnumerable<Pessoa>> ObterTodasPessoas();
    }
}