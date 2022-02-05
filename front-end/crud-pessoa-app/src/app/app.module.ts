import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './pessoa/lista/lista.component';
import { CadastroComponent } from './pessoa/cadastro/cadastro.component';
import { DetalheComponent } from './pessoa/detalhe/detalhe.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import { PessoaService } from './services/pessoa.service';
import { ExcluirComponent } from './pessoa/excluir/excluir.component'

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    CadastroComponent,
    DetalheComponent,
    MenuComponent,
    FooterComponent,
    ExcluirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
