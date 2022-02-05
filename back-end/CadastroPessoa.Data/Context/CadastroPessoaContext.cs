using CadastroPessoa.Entities;
using Microsoft.EntityFrameworkCore;

namespace CadastroPessoa.Context
{
    public class CadastroPessoaContext : DbContext
    {
        public CadastroPessoaContext(DbContextOptions op) : base(op)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasDefaultSchema("cadastropessoa");
            builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }
}