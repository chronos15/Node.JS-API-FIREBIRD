const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const conn = require("./connection").getConnection();

app.use(express.json({ limit: 5000 }));
app.use(cors());

const controller = require("./controller");

app.get(["/", "/api"], (req, res) => {
  console.log(req.url);
  res.status(200).json({ ok: true, message: "Node API Firebird" });
});

app.get('/api/clientes/:id?', async (req, res) => {
  let filter = '';
  await conn.get(async (err, db) => {
    if (err) res.status(500).json({ ok: false, error: "Não foi possível conectar ao banco de dados" });
    if(req.params.id) filter = ' WHERE ID_CODIGO=' + parseInt(req.params.id);
    return db.query('SELECT ID_CODIGO, NOME FROM CLIENTES ORDER BY ID_CODIGO ASC' + filter, res, (err, result) => {
      if (err) res.status(500).json({ ok: false, error: "Não foi possível ler a Query" });
      if (typeof result === "object") {
        Object.entries(result).forEach((value, index) => {
          Object.entries(result[index]).forEach((val) => {
            const buff = result[index][val[0]];
            result[index][val[0]] = Buffer.isBuffer(buff) ? Buffer.from(buff).toString() : buff;
          });
        });
      }
      db.detach();
      res.status(200).json(result);
    });
  });
});

app.get("/api/ordem", async (req, res) => {
  await controller.getOrdem(res);
});

app.get("/api/produtos", async (req, res) => {
  await controller.getProdutos(res);
});

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
