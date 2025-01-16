
from flask import g
from dotenv import load_dotenv
import os
load_dotenv()

class Acesso:
    def __init__(self, username, password):
        self.username = username
        self.password = password
usuarios = [
    Acesso('user1', 'senha1'),
    Acesso('user2', 'senha2'),
    Acesso('user3', 'senha3')
]

def operacao(data):
    match data['sinal']:
        case '+':
            return int(data['num1'])+int(data['num2']) 
        case '-':
            return int(data['num1'])-int(data['num2'])
        case '*':
            return int(data['num1'])*int(data['num2'])
        case '/':
            return float(("{0:.2f}".format(float(data['num1'])/float(data['num2']))))
        case _:     
            return "N/A";           

def login(data):
    for usuario in usuarios:
        if usuario.username == data['username'] and usuario.password == data['password']:
            return usuario
    return None


