using CadastroPessoa.Context;
using CadastroPessoa.Entities;
using Microsoft.EntityFrameworkCore;

namespace CadastroPessoa.Repository
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly CadastroPessoaContext _context;

        public PessoaRepository(CadastroPessoaContext context)
        {
            _context = context;
        }

        public async Task AdicionarPessoa(Pessoa pessoa) => await _context.AddAsync(pessoa);

        public async Task<Pessoa> ObterPessoaAlteracao(int id) =>
                await _context.Pessoas.FirstOrDefaultAsync(c => c.Id == id);

        public async Task<Pessoa> ObterPessoaJaCadastrada(string cpf) =>
            await _context.Pessoas.AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(c => c.Cpf.Equals(cpf));

        public async Task<IEnumerable<Pessoa>> ObterTodasPessoas() =>
                await _context.Pessoas.AsNoTrackingWithIdentityResolution().ToListAsync();

        public void Remover(Pessoa pessoa) => _context.Remove(pessoa);

        public async Task SaveChanges() => await _context.SaveChangesAsync();
    }
}