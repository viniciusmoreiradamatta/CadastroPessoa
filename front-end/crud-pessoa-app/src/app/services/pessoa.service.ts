import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment.prod'
import { pessoa } from '../pessoa/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private controller = '/Pessoa/';
  private url = environment.apiUrl;
  protected UrlService: string;

  constructor(private _client: HttpClient) {
    this.UrlService = this.url + this.controller;
  }

    ObterTodos(): Observable<pessoa[]> {
      return this._client.get<pessoa[]>(this.UrlService);
    }

  ObterPorId(Id: number): Observable<any> {
    let url = this.UrlService + `${Id}`;

    return this._client.get<any[]>(url);
  }

  Adicionar(person: pessoa): Observable<any> {
    return this._client.post<pessoa>(this.UrlService, person);
  }

  Alterar(person: pessoa): Observable<any> {
    return this._client.put<pessoa>(this.UrlService, person);
  }

  Excluir(Id: number): Observable<any> {
    let url = this.UrlService + `${Id}`;

    return this._client.delete<any[]>(url);
  }
}