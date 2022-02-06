namespace CadastroPessoa.Entities
{
    public class Pessoa
    {
        public Pessoa(string nome, string sobrenome, string nacionalidade, string cep, string cpf,
                      string estado, string cidade, string logradouro, string email, string telefone)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Nacionalidade = nacionalidade;
            Cep = cep;
            Estado = estado;
            Cidade = cidade;
            Logradouro = logradouro;
            Email = email;
            Telefone = telefone;
            Cpf = cpf;
        }

        public int Id { get; set; }
        public string Nome { get; private set; }
        public string Cpf { get; private set; }
        public string Sobrenome { get; private set; }
        public string Nacionalidade { get; private set; }
        public string Cep { get; private set; }
        public string Estado { get; private set; }
        public string Cidade { get; private set; }
        public string Logradouro { get; private set; }
        public string Email { get; private set; }
        public string Telefone { get; private set; }

        public void AlterarNome(string novoNome)
        {
            this.Nome = novoNome;
        }

        public void AlterarCpf(string novoCpf)
        {
            this.Cpf = novoCpf;
        }

        public void AlterarSobrenome(string novoSobrenome)
        {
            this.Sobrenome = novoSobrenome;
        }

        public void AlterarNacionalidade(string novaNacionalidade)
        {
            this.Nacionalidade = novaNacionalidade;
        }

        public void AlterarCep(string novoCep)
        {
            this.Cep = novoCep;
        }

        public void AlterarEstado(string novoEstado)
        {
            this.Estado = novoEstado;
        }

        public void AlterarCidade(string novaCidade)
        {
            this.Cidade = novaCidade;
        }

        public void AlterarLogradouro(string novoLogradouro)
        {
            this.Logradouro = novoLogradouro;
        }

        public void AlterarTelefone(string novoTelefone)
        {
            this.Telefone = novoTelefone;
        }

        public void AlterarEmail(string novoEmail)
        {
            this.Email = novoEmail;
        }
    }
}