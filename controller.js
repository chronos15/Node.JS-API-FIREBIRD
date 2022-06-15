const conn = require("./connection").getConnection();

const getClientes = async (res) => {
  await conn.get(async (err, db) => {
    if (err) res.status(500).json({ ok: false, error: "Não foi possível conectar ao banco de dados" });
    return db.query("SELECT ID_CODIGO, NOME FROM CLIENTES", (err, result) => {
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
};

module.exports = { getClientes };

const getOrdem = async (res) => {
  await conn.get(async (err, db) => {
    if (err) res.status(500).json({ ok: false, error: "Não foi possível conectar ao banco de dados" });
    return db.query("SELECT ID_NUMERO, NOMECLIENTE FROM ORDEMSERVICO", (err, result) => {
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
};

module.exports = { getOrdem };


