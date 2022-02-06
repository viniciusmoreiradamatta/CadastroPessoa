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

          this.pessoa.logradouro = result.logradouro;
          this.pessoa.cidade = result.localidade;

          let estadoSecionado = this.VerificarEstadoSelecionado(result.uf);
          this.pessoa.estado = estadoSecionado.sigla;
        },
        error: (error) => {
        }
      });
  }

  getCpfCnpjMask(): string {
    return '000.000.000-009';
  }

  VerificarEstadoSelecionado(sigla: string): estado {
    let estadoSecionado = this.estados.filter((val) => val.sigla.toUpperCase() == sigla.toUpperCase())
    let estado = estadoSecionado[0];
    this.idEstado = estado.id;
    return estado;
  }

  Salvar() {
    if (this.DadosValidos() == false)
      return;

    if (this.id > 0) {
      this.EditarPessoa();
    }

    this.AdicionarPessoa();
  }

  EditarPessoa() {
    this._pessoaService.Alterar(this.pessoa)
      .subscribe({
        next: result => {
        },
        error: (error) => {

          this.tipoMensagem = 'Ocorreu um erro ao finalizar, tente novamente:';
          debugger
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
        },
        error: (error) => {
          this.tipoMensagem = 'Ocorreu um erro ao finalizar, tente novamente:';
          debugger
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
        },
        error: (error) => {
        }
      });
  }
}