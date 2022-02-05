import { Component, OnInit } from '@angular/core';
import { pessoa } from '../pessoa';

import { PessoaService } from '../../services/pessoa.service'
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})

export class ListaComponent implements OnInit {
  public pessoas: pessoa[];
  errorMessage: string;

  constructor(private _service: PessoaService) {
    this.pessoas = [];
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.pessoas = [];
    this._service.ObterTodos().subscribe({
      next: result => {
        debugger
        this.pessoas = result
      },
      error: (error) => {
        debugger
        this.errorMessage = 'Ocorreu um erro'
      }
    });
  }
}
