import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { estado } from '../estado'
import { pessoa } from '../pessoa'

import { EstadoService } from '../../services/estado.service'
import { PessoaService } from '../../services/pessoa.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})

export class CadastroComponent implements OnInit {

  constructor(private _estadoService: EstadoService, private _pessoaService: PessoaService,
    private route: ActivatedRoute, private router: Router) {
  }

  errors: any[] = [];
  estados: estado[] = [];
  pessoa: pessoa = new pessoa();
  id: number = 0;
  idEstado: number = 0;
  tipoMensagem: string = '';
  ngOnInit(): void {
    this.VerificarAlteracao();

    this.CarregarEstados();
  }

  BucarCep() {
    this._estadoService.ObterEnderecoPorCep(this.pessoa.cep)
      .subscribe({
        next: result => {
          if (result.erro == true) {
            return;
          }

          this.pessoa.logradouro = result.logradouro;
          this.pessoa.cidade = result.localidade;

          let estadoSecionado = this.VerificarEstadoSelecionado(result.uf);
          this.pessoa.estado = estadoSecionado.sigla;
        },
        error: (error) => {
        }
      });
  }

  VerificarEstadoSelecionado(sigla: string): estado {
    let estado: estado;

    if (sigla == '') {
      estado = this.VerificarEstadoPorId();
    }
    else
      estado = this.VerificarEstadoPorSigla(sigla);
    
      return estado;
  }

  VerificarEstadoPorId(): estado {
    let estadoSecionado = this.estados.filter((val) => val.id == this.idEstado);
    let estado = estadoSecionado[0];

    this.pessoa.estado = estado.sigla;

    return estado;
  }

  VerificarEstadoPorSigla(sigla: string) {
    let estadoSecionado = this.estados.filter((val) => val.sigla.toUpperCase() == sigla.toUpperCase());

    let estado = estadoSecionado[0];

    if (estadoSecionado.length == 0 || estado.id == 0) {
      let estadoNulo: estado = { id: 0, nome: 'Selecione', sigla: '' };
      return estadoNulo;
    }

    this.idEstado = estado.id;
    return estado;
  }

  Salvar() {
    if (this.DadosValidos() == false)
      return;

    if (this.estados.length == 0)
      this.CarregarEstados();

    this.VerificarEstadoSelecionado(this.pessoa.estado);

    if (this.id > 0) {

      this.EditarPessoa();
      return;
    }

    this.AdicionarPessoa();
  }

  EditarPessoa() {
    this._pessoaService.Alterar(this.pessoa)
      .subscribe({
        next: result => {
          this.router.navigate(['/']);
        },
        error: (error) => {

          this.tipoMensagem = 'Ocorreu um erro ao finalizar, tente novamente:';

          if (error.error.erros != undefined) {
            error.error.erros.forEach((item: any, index: number) => {
              let mensagemErro = `${item.propertyName}: ${item.errorMessage}`
              this.errors.push(mensagemErro);
            });
          }
        }
      });
  }

  AdicionarPessoa() {
    this._pessoaService.Adicionar(this.pessoa)
      .subscribe({
        next: result => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.tipoMensagem = 'Ocorreu um erro ao finalizar, tente novamente:';

          if (error.error.erros != undefined) {
            error.error.erros.forEach((item: any, index: number) => {
              let mensagemErro = `${item.propertyName}: ${item.errorMessage}`
              this.errors.push(mensagemErro);
            });
          }
        }
      });
  }

  DadosValidos() {
    this.LimparValidacoes();

    if (this.pessoa.nome == '') {
      this.errors.push('Preencha o nome')
    }
    if (this.pessoa.sobrenome == '') {
      this.errors.push('Preencha o sobrenome')
    }
    if (this.pessoa.nacionalidade == '') {
      this.errors.push('Preencha a nacionalidade')
    }
    if (this.pessoa.cep == '') {
      this.errors.push('Preencha o cep')
    }
    if (this.idEstado == 0) {
      this.errors.push('Selecione um estado')
    }
    if (this.pessoa.cidade == '') {
      this.errors.push('Preencha o cidade')
    }
    if (this.pessoa.logradouro == '') {
      this.errors.push('Preencha o logradouro')
    }
    if (this.pessoa.email == '') {
      this.errors.push('Preencha o email')
    }
    if (this.pessoa.telefone == '') {
      this.errors.push('Preencha o telefone')
    }
    if (this.pessoa.cpf == '') {
      this.errors.push('Preencha o Cpf')
    }
    else if (this.valida_cnpj(this.pessoa.cpf) == false) {
      this.errors.push('Cpf invalido')
    }

    this.tipoMensagem = 'Verifique os campos obrigatorios:';
    return this.errors.length == 0;
  }

  LimparValidacoes() {
    this.errors = [];
  }

  CarregarEstados() {
    this._estadoService.ObterEstados().subscribe({
      next: result => {
        this.estados = result
        this.estados = result.sort((a, b) => {
          if (a.nome > b.nome)
            return 1

          return -1
        });

        let estadoNulo: estado = { id: 0, nome: 'Selecione', sigla: '' };
        this.estados.unshift(estadoNulo)
      },
      error: (error) => {
      }
    });
  }

  VerificarAlteracao() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'].toString();
        this.CarregarPessoa();
      }
    });
  }

  CarregarPessoa() {
    this._pessoaService.ObterPorId(this.id)
      .subscribe({
        next: result => {
          this.pessoa = result;
          this.VerificarEstadoSelecionado(this.pessoa.estado);
        },
        error: (error) => {
        }
      });
  }


  valida_cnpj(valor: string) {


    valor = valor.toString();
    valor = valor.replace(/[^0-9]/g, '');

    var digitos = valor.substr(0, 9);

    var novo_cpf = this.calc_digitos_posicoes(digitos);
    var novo_cpf_segundo = this.calc_digitos_posicoes(novo_cpf, 11);

    if (novo_cpf_segundo === valor) {

      if (novo_cpf_segundo === "11111111111" || novo_cpf_segundo === "22222222222" || novo_cpf_segundo === "33333333333"
        || novo_cpf_segundo === "44444444444" || novo_cpf_segundo === "55555555555" || novo_cpf_segundo === "66666666666"
        || novo_cpf_segundo === "77777777777" || novo_cpf_segundo === "88888888888" || novo_cpf_segundo === "99999999999"
        || novo_cpf_segundo === "99999999998") {
        return false;
      }
      else {
        return true;
      }
    } else {
      return false;
    }
  }
  calc_digitos_posicoes(digitos: any, posicoes = 10, soma_digitos = 0) {

    digitos = digitos.toString();

    for (var i = 0; i < digitos.length; i++) {
      soma_digitos = soma_digitos + (digitos[i] * posicoes);

      posicoes--;

      if (posicoes < 2) {
        posicoes = 9;
      }
    }

    soma_digitos = soma_digitos % 11;

    if (soma_digitos < 2) {
      soma_digitos = 0;

    } else {
      soma_digitos = 11 - soma_digitos;
    }

    var cpf = digitos + soma_digitos;

    return cpf;
  }
}