#ESTE ARQUIVO É ONDE SE CONCENTRAM AS ROTAS DO APP, BEM COMO CONFIGURAÇÕES DE SEGURANÇA E AUTENTICAÇÃO.
import hashlib
import ssl
import random
import jwt 
import datetime
import db_app
import schedule
import bcrypt
import requests
import time

from flask_cors import CORS
from flask import Flask, jsonify, request, make_response
from json import loads
from functools import wraps
from jwt import ExpiredSignatureError
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
#CHAVE ÚNICA DO APP QUE É UTILIZADA EM CONJUNTO COM OUTRAS INFORMAÇÕES PARA GERAR O JWT (TOKEN DE AUTENTICAÇÃO PADRÃO OAUTH 2.0)
app.config['SECRET_KEY'] =  "u2NvS9gRz6KdW5bA7x4HjL3pM1qC8wT0"

#cert_file = 'fullchain2.pem'
#key_file = 'privkey2.pem'
#context = ssl.SSLContext(ssl.PROTOCOL_TLS)
#context.load_cert_chain(certfile=cert_file, keyfile=key_file)
#--------------------------------------------------------------------------

def gerar_token(usuario):
    payload = {
        'usuario': usuario,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expira em 1 hora
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

def autenticar(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token ausente!'}), 401
        try:
            token = token.split()[1]  # Remove o prefixo "Bearer"
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except ExpiredSignatureError:
            return jsonify({'message': 'Token expirado!'}), 401
        except Exception as e:
            return jsonify({'message': 'Token inválido!', 'error': str(e)}), 401
        return f(*args, **kwargs)
    return decorated


@app.route("/")
def keep_alive():
    return jsonify({'message': '200'})

@app.route("/operacao", methods=['POST'])
@autenticar
def operacao():
    data = request.json
    obj = {}
    obj['data'] = db_app.operacao(data)
    return jsonify(obj)
      
@app.route("/login", methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e password são obrigatórios'}), 400

    user = db_app.login({'username': username, 'password': password})
    print(user)
    if user:
        token = gerar_token(username)
        return jsonify({'token': token}), 200
    return jsonify({'message': 'Credenciais inválidas!'}), 401
 

#AQUI A INICIALIZAÇÃO DO APP
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)