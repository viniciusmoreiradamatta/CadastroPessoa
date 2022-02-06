import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pessoa } from '../pessoa'

import { PessoaService } from '../../services/pessoa.service'

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
})
export class DetalheComponent implements OnInit {
  pessoa: pessoa = new pessoa();
  id: number = 0;

  constructor(private _pessoaService: PessoaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'].toString();
        this.ObterDetalhes();
      }
    });

  }

  ObterDetalhes() {
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
