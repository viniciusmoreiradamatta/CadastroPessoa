using CadastroPessoa.Entities;
using FluentValidation;
using Xunit;

namespace CadastroPessoa.Test
{
    public class PessoaTest
    {
        [Fact]
        public void validar_pessoa_criada_corretamente()
        {
            PessoaValidator validator = new();

            Pessoa p = new("Usuario", "Sobrenome", "Brasileira", "78965454", "uf", "Cidade",
                           "Logradouro", "Email@email.com", "telefone");

            Assert.True(validator.Validate(p).IsValid);
        }

        [Fact]
        public void validar_pessoa_nome_acima_maximo()
        {
            PessoaValidator validator = new();

            Pessoa pessoa = new("Clientecomnomemuitograndeparasalvarnacolunadobancow", "Sobrenome", "Brasileira", "78965454", "uf", "Cidade",
                           "Logradouro", "Email@email.com", "telefone");

            var result = Assert.Throws<ValidationException>(() => validator.Validate(pessoa, options => options.ThrowOnFailures()).IsValid);
        }

        [Fact]
        public void validar_pessoa_propriedades_vazias()
        {
            PessoaValidator validator = new();

            Pessoa pessoa = new("Clientecomnomemuitograndeparasalvarnacolunadobancow", "Sobrenome", "Brasileira", "78965454", "uf", "Cidade",
                           "", "Email@email.com", "");

            var result = Assert.Throws<ValidationException>(() => validator.Validate(pessoa, options => options.ThrowOnFailures()).IsValid);
        }
    }
}