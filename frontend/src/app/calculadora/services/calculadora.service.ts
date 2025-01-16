import { Injectable } from '@angular/core';

/*
* Serviço responsável por realizar a chamada a API
* @author Vinicius Braga Cunha <cunha.vinicius@outlook.com.br>
*/

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly DIVISAO: string = '/';
  static readonly MULTIPLICACAO: string = '*';

  constructor() { }

  async calcular(sinal: string, num1: number, num2: number, token: string): Promise<number> {
    try {
      token = localStorage.getItem('auth_token');
      const response = await fetch('http://172.28.32.1:44665/operacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ num1, num2, sinal }),
      });

      if (!response.ok) {
        throw new Error('Erro na chamada da API');
      }

      const data = await response.json();
      console.log(data);
      return data['data'];
    } catch (error) {
      console.log('Erro:', error);
      return 0;
    }
  }
}
