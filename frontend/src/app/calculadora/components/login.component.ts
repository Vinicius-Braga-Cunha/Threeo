import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importe o Router
import { LoginService } from '../services/login.service';  // Importando o serviço

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  onSubmit(): void {
    // Lógica para autenticar o usuário
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response && response.token) {
          // Armazenando o token no localStorage
          localStorage.setItem('auth_token', response.token);

          // Login bem-sucedido, redireciona para a calculadora
          this.router.navigate(['/calculadora']);
        } else {
          // Caso o login falhe
          this.errorMessage = 'Credenciais inválidas!';
        }
      },
      (error) => {
        this.errorMessage = 'Erro ao fazer login';
        console.error(error);
      }
    );
  }
}
