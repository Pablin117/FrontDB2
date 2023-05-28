import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaComponent } from './pagina/pagina.component';
import { InicioComponent } from './inicio/inicio.component';
const routes: Routes = [

  {path:'',component:PaginaComponent},
  {path:'inicio',component:InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
