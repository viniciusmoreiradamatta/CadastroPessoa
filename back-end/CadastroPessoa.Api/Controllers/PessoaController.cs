using CadastroPessoa.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CadastroPessoa.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaRepository pessoaRepository;

    public PessoaController(IPessoaRepository pessoaRepository)
    {
        this.pessoaRepository = pessoaRepository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await this.pessoaRepository.ObterTodasPessoas();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var result = await this.pessoaRepository.ObterPessoaAlteracao(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Pessoa pessoa)
    {
        PessoaValidator validador = new();
        var validacao = validador.Validate(pessoa);

        if (!validacao.IsValid)
            return BadRequest(new
            {
                erros = validacao.Errors.Select(c => new { c.PropertyName, c.ErrorMessage })
            });

        await this.pessoaRepository.AdicionarPessoa(pessoa);
        await this.pessoaRepository.SaveChanges();

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Put(Pessoa pessoa)
    {
        PessoaValidator validador = new();

        var pessoaAlteracao = await this.pessoaRepository.ObterPessoaAlteracao(pessoa.Id);

        if (pessoaAlteracao is null)
            return NotFound();

        pessoaAlteracao.AlterarNome(pessoa.Nome);
        pessoaAlteracao.AlterarSobrenome(pessoa.Sobrenome);
        pessoaAlteracao.AlterarNacionalidade(pessoa.Nacionalidade);
        pessoaAlteracao.AlterarEstado(pessoa.Estado);
        pessoaAlteracao.AlterarLogradouro(pessoa.Logradouro);
        pessoaAlteracao.AlterarTelefone(pessoa.Telefone);
        pessoaAlteracao.AlterarCidade(pessoa.Cidade);
        pessoaAlteracao.AlterarCep(pessoa.Cep);
        pessoaAlteracao.AlterarEmail(pessoa.Email);

        var validacao = validador.Validate(pessoaAlteracao);

        if (!validacao.IsValid)
            return BadRequest(new
            {
                erros = validacao.Errors.Select(c => new { c.PropertyName, c.ErrorMessage })
            });

        await this.pessoaRepository.SaveChanges();

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var pessoa = await this.pessoaRepository.ObterPessoaAlteracao(id);

        this.pessoaRepository.Remover(pessoa);

        await this.pessoaRepository.SaveChanges();

        return Ok();
    }
}