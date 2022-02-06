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
      let absoluteUrl = this.UrlService;

      return this._client.get<pessoa[]>(absoluteUrl);
    }

  ObterPorId(Id: number): Observable<any> {
    let absoluteUrl = this.UrlService + `${Id}`;

    return this._client.get<any[]>(absoluteUrl);
  }

  Adicionar(person: pessoa): Observable<any> {
    let absoluteUrl = this.UrlService + ``;

    return this._client.post<pessoa>(absoluteUrl, person);
  }

  Alterar(person: pessoa): Observable<any> {
    let absoluteUrl = this.UrlService + ``;

    return this._client.put<pessoa>(absoluteUrl, person);
  }

  Excluir(Id: number): Observable<any> {
    let absoluteUrl = this.UrlService + `${Id}`;

    return this._client.delete<any[]>(absoluteUrl);
  }
}