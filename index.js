const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json({ limit: 5000 }));
app.use(cors());

const controller = require("./controller");

app.get(["/", "/api"], (req, res) => {
  console.log(req.url);
  res.status(200).json({ ok: true, message: "Node API Firebird" });
});

app.get("/api/clientes", async (req, res) => {
  await controller.getClientes(res);
});

app.get("/api/ordem", async (req, res) => {
  await controller.getOrdem(res);
});

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
