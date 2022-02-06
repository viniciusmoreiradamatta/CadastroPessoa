import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListaComponent } from './pessoa/lista/lista.component';
import { CadastroComponent } from './pessoa/cadastro/cadastro.component';
import { ExcluirComponent } from './pessoa/excluir/excluir.component'
import { DetalheComponent } from './pessoa/detalhe/detalhe.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

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
    FormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
