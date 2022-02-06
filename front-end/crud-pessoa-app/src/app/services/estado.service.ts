import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from "@angular/common/http"

import { estado, endereco } from '../pessoa/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  endercoExterno: string = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  constructor(private _client: HttpClient) { }

  ObterEstados(): Observable<estado[]> {
    return this._client.get<estado[]>(this.endercoExterno);
  }

  ObterEnderecoPorCep(cep: string): Observable<endereco> {
    let enderecoViaCep: string = "https://viacep.com.br/ws/" + cep + "/json/";

    return this._client.get<endereco>(enderecoViaCep);
  }
}
