using CadastroPessoa.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CadastroPessoa.Api.Controllers;

[ApiController]
[Route("[controller]")]
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
        await this.pessoaRepository.AdicionarPessoa(pessoa);
        await this.pessoaRepository.SaveChanges();

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Put(Pessoa pessoa)
    {
        var pessoaAlteracao = await this.pessoaRepository.ObterPessoaAlteracao(pessoa.Id);

        pessoaAlteracao.AlterarNomePessoa(pessoa.Nome);

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