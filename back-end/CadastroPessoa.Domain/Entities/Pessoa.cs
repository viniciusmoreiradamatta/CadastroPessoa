namespace CadastroPessoa.Entities
{
    public class Pessoa
    {
        public Pessoa(string nome, string sobrenome, string nacionalidade, string cep,
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
        }

        public int Id { get; set; }
        public string Nome { get; private set; }
        public string Sobrenome { get; private set; }
        public string Nacionalidade { get; private set; }
        public string Cep { get; private set; }
        public string Estado { get; private set; }
        public string Cidade { get; private set; }
        public string Logradouro { get; private set; }
        public string Email { get; private set; }
        public string Telefone { get; private set; }

        public void AlterarNomePessoa(string novoNome)
        {
            this.Nome = novoNome;   
        }
    }
}