import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './calculadora/components';
import { CalculadoraComponent } from './calculadora/components';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Defina a rota inicial como Login
  { path: 'calculadora', component: CalculadoraComponent },  // Rota para a calculadora
  { path: '**', redirectTo: '' }  // Redirecionamento caso a rota não seja encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
