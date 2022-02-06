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

            Pessoa pessoa = new("Usuario", "Sobrenome", "Brasileira", "78965454", "04442156322", "uf", "Cidade",
                           "Logradouro", "Email@email.com", "telefone");

            Assert.True(validator.Validate(pessoa).IsValid);
        }

        [Fact]
        public void validar_pessoa_nome_acima_maximo()
        {
            PessoaValidator validator = new();

            Pessoa pessoa = new("Clientecomnomemuitograndeparasalvarnacolunadobancow", "Sobrenome", "Brasileira", "78965454", "04442156322", "uf", "Cidade",
                           "Logradouro", "Email@email.com", "telefone");

            var result = Assert.Throws<ValidationException>(() => validator.Validate(pessoa, options => options.ThrowOnFailures()).IsValid);
        }

        [Fact]
        public void validar_pessoa_email_invalido()
        {
            PessoaValidator validator = new();

            Pessoa pessoa = new("nome", "Sobrenome", "Brasileira", "78965454", "04442156322", "uf", "Cidade",
                           "asdasdasd", "Emailinvalido", "5464546");

            var result = Assert.Throws<ValidationException>(() => validator.Validate(pessoa, options => options.ThrowOnFailures()).IsValid);
        }

        [Theory]
        [InlineData("nome", "Sobrenome", "Brasileira", "cep", "04442156322", "uf", "Cidade", "logradouro", "Email@email.com", "")]
        [InlineData("nome", "Sobrenome", "Brasileira", "cep", "04442156322", "uf", "Cidade", "logradouro", "", "telefone")]
        [InlineData("nome", "Sobrenome", "Brasileira", "cep", "04442156322", "uf", "Cidade", "", "Email@email.com", "telefone")]
        [InlineData("nome", "Sobrenome", "Brasileira", "cep", "04442156322", "uf", "", "logradouro", "Email@email.com", "telefone")]
        [InlineData("nome", "Sobrenome", "Brasileira", "cep", "04442156322", "", "Cidade", "logradouro", "Email@email.com", "telefone")]
        [InlineData("nome", "Sobrenome", "Brasileira", "cep", "", "uf", "Cidade", "logradouro", "Email@email.com", "telefone")]
        [InlineData("nome", "Sobrenome", "Brasileira", "", "04442156322", "uf", "Cidade", "logradouro", "Email@email.com", "telefone")]
        [InlineData("nome", "Sobrenome", "", "cep", "04442156322", "uf", "Cidade", "logradouro", "Email@email.com", "telefone")]
        [InlineData("nome", "", "Brasileira", "cep", "04442156322", "uf", "Cidade", "logradouro", "Email@email.com", "telefone")]
        [InlineData("", "Sobrenome", "Brasileira", "cep", "04442156322", "uf", "Cidade", "logradouro", "Email@email.com", "telefone")]
        public void validar_pessoa_propriedades_vazia(string nome, string sobrenome, string nacionalidade, string cep, string cpf,
                                                       string uf, string cidade, string logradouro, string email, string telefone)
        {
            PessoaValidator validator = new();

            Pessoa pessoa = new(nome, sobrenome, nacionalidade, cep, cpf, uf, cidade, logradouro, email, telefone);

            var result = Assert.Throws<ValidationException>(() => validator.Validate(pessoa, options => options.ThrowOnFailures()).IsValid);
        }
    }
}