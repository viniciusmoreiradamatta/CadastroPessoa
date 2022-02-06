import { Component, OnInit } from '@angular/core';
import { pessoa } from '../pessoa';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PessoaService } from '../../services/pessoa.service'
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})

export class ListaComponent implements OnInit {
  public pessoas: pessoa[];
  public pessoaExclusao: pessoa = new pessoa();
  errorMessage: string;

  constructor(private _service: PessoaService, private modalService: NgbModal) {
    this.pessoas = [];
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.pessoas = [];
    this._service.ObterTodos().subscribe({
      next: result => {
        this.pessoas = result
      },
      error: (error) => {
        this.errorMessage = 'Ocorreu um erro'
      }
    });
  }

  closeResult = '';

  open(content: any, pessoa: pessoa) {
    this.pessoaExclusao = pessoa;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {

        this._service.Excluir(result).subscribe({
          next: result => {
            window.location.reload();
          },
          error: (error) => {
            this.errorMessage = 'Ocorreu um erro'
          }
        });
      }, (reason) => {
      });
  }
}
