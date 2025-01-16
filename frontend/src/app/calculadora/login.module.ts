import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoraComponent, LoginComponent } from './components';
import { CalculadoraService, LoginService } from './services';

@NgModule({
  declarations: [

    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,

  ],
  providers:[
    LoginService,
    CalculadoraService,

  ]
})
export class LoginModule {

}
