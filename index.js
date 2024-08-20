//é preciso usar recursos já prontos que impeçam a reinvenção da roda.
import express from 'express';
import autenticar from './seguranca/autenticar.js';
import { verificarAutenticacao, logout } from './seguranca/autenticar.js';
import session from 'express-session';

const host = '0.0.0.0'; //Todas as interfaces de rede disponíveis
//em um computador há diversos programas sendo executados
//cada programa é identificado por um número, esse número é a porta
const porta = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));

//aqui está sendo configurado o uso da biblioteca session
app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}))

app.use(express.static('./publico'));

//endpoint http://localhost:3000/login
app.get('/login',(requisicao, resposta) => {
    resposta.redirect('/login.html');
});

app.get('/logout', logout)

app.post('/login', autenticar);

app.use(verificarAutenticacao, express.static('./privado'));


//listen = escutar pro requisições dos usuários
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

