import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoraComponent, LoginComponent } from './components';
import { CalculadoraService, LoginService } from './services';

@NgModule({
  declarations: [
    CalculadoraComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalculadoraComponent,

  ],
  providers:[
    CalculadoraService,

  ]
})
export class CalculadoraModule {

}
