using CadastroPessoa.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CadastroPessoa.Map
{
    public class PessoaMap : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).HasColumnName("id");
            builder.Property(c => c.Nome).HasMaxLength(50).HasColumnName("nome");
            builder.Property(c => c.Sobrenome).HasMaxLength(200).HasColumnName("sobrenome");
            builder.Property(c => c.Cep).HasMaxLength(8).HasColumnName("cep");
            builder.Property(c => c.Logradouro).HasMaxLength(50).HasColumnName("logradouro");
            builder.Property(c => c.Cidade).HasMaxLength(50).HasColumnName("cidade");
            builder.Property(c => c.Estado).HasMaxLength(2).HasColumnName("estado");
            builder.Property(c => c.Email).HasMaxLength(50).HasColumnName("email");
            builder.Property(c => c.Telefone).HasMaxLength(13).HasColumnName("telefone");
            builder.Property(c => c.Nacionalidade).HasMaxLength(20).HasColumnName("nacionalidade");

            builder.ToTable("pessoa");
        }
    }
}