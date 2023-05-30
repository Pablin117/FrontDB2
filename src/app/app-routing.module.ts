import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaComponent } from './pagina/pagina.component';
import { LoginComponent} from "./login/login.component";

const routes: Routes = [

  {path:'home',component:PaginaComponent},
  {path:'',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
