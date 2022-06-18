const conn = require("./connection").getConnection();

const getClientes = async (res, req) => {
  await conn.get(async (err, db) => {
    if (err) res.status(500).json({ ok: false, error: "Não foi possível conectar ao banco de dados" });
    return db.query("SELECT * FROM CLIENTES ORDER BY ID_CODIGO ASC", (err, result) => {
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



const getOrdem = async (res) => {
  await conn.get(async (err, db) => {
    if (err) res.status(500).json({ ok: false, error: "Não foi possível conectar ao banco de dados" });
    return db.query("SELECT ID_NUMERO, ID_CLIENTE, NOMECLIENTE, SITUACAO FROM ORDEMSERVICO", (err, result) => {
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


const getProdutos = async (res) => {
  await conn.get(async (err, db) => {
    if (err) res.status(500).json({ ok: false, error: "Não foi possível conectar ao banco de dados" });
    return db.query("SELECT * FROM PRODUTOS", (err, result) => {
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

module.exports = { getClientes, getOrdem, getProdutos };


