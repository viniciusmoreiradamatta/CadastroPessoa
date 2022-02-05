using CadastroPessoa.Entities;
using FluentValidation;

namespace CadastroPessoa
{
    public class PessoaValidator : AbstractValidator<Pessoa>
    {
        public PessoaValidator()
        {

            RuleFor(c => c.Nome).MaximumLength(50).WithMessage("Tamanho maximo atingido")
                                .NotEmpty().WithMessage("O nome nao pode ser nulo");

            RuleFor(c => c.Sobrenome).MaximumLength(100).WithMessage("Tamanho maximo atingido")
                                     .NotEmpty().WithMessage("O Sobrenome nao pode ser nulo");

            RuleFor(c => c.Logradouro).MaximumLength(50).WithMessage("Tamanho maximo atingido")
                                     .NotEmpty().WithMessage("O Logradouro nao pode ser nulo");

            RuleFor(c => c.Cep).MaximumLength(8).WithMessage("Tamanho maximo atingido")
                                     .NotEmpty().WithMessage("O Cep nao pode ser nulo");

            RuleFor(c => c.Cidade).MaximumLength(50).WithMessage("Tamanho maximo atingido")
                                     .NotEmpty().WithMessage("A Cidade nao pode ser nulo");

            RuleFor(c => c.Estado).MaximumLength(2).WithMessage("Tamanho maximo atingido")
                                     .NotEmpty().WithMessage("O Estado nao pode ser nulo");

            RuleFor(c => c.Email).EmailAddress().WithMessage("Email invalido")
                                 .MaximumLength(50).WithMessage("Tamanho maximo atingido")
                                 .NotEmpty().WithMessage("O Email nao pode ser nulo");

            RuleFor(c => c.Telefone).MaximumLength(13).WithMessage("Tamanho maximo atingido")
                                     .NotEmpty().WithMessage("O Telefone nao pode ser nulo");

            RuleFor(c => c.Nacionalidade).MaximumLength(20).WithMessage("Tamanho maximo atingido")
                                         .NotEmpty().WithMessage("A Nacionalidade nao pode ser nula");
        }
    }
}