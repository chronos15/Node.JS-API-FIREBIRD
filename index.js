const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const firebird = require('node-firebird');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');



const configuracoes = {
  database: 'C:/SOFTWORK/SOFTWORK.FDB',
  user: 'SYSDBA',
  password: 'swfppa215',
};

const pool = firebird.pool(5, configuracoes);

const executar = (query) => {
  return new Promise((resolver, rejeitar) => {
    pool.get((err, db) => {
      if (err) {
        rejeitar(err);
        return;
      }

      db.query(query, (erro, resultado) => {
        if (erro) {
          rejeitar(err);
          return;
        }

        db.detach();
        resolver(resultado);
      });
    });
  });
}

(async () => {
    console.log(await executar('SELECT * FROM TEST'));
  })();

