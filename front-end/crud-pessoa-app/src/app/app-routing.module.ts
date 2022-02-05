import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './pessoa/lista/lista.component';
import { CadastroComponent } from './pessoa/cadastro/cadastro.component';
import { DetalheComponent } from './pessoa/detalhe/detalhe.component';
import { ExcluirComponent } from './pessoa/excluir/excluir.component';


const routes: Routes = [
  {
    path: '', component: ListaComponent
  },
  {
    path: 'cadastro', component: CadastroComponent,
  },
  {
    path: 'cadastro/:id', component: CadastroComponent,
  },
  {
    path: 'detalhes/:id', component: DetalheComponent,
  },
  {
    path: 'excluir/:id', component: ExcluirComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
