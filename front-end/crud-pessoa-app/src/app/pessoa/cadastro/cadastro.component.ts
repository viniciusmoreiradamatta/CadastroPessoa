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
  displayMessage: any = {};
  estados: estado[] = [];
  pessoa: pessoa = new pessoa();
  id: number = 0;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'].toString();

        this._pessoaService.ObterPorId(this.id)
          .subscribe({
            next: result => {
              this.pessoa = result;
            },
            error: (error) => {
            }
          });
      }
    });

    this._estadoService.ObterEstados().subscribe({
      next: result => {
        this.estados = result
        let estadoNulo: estado = { id: 0, nome: 'Selecione', sigla: '' };
        this.estados.unshift(estadoNulo)
      },
      error: (error) => {
      }
    });
  }

  AdicionarPessoa() {

  }
}