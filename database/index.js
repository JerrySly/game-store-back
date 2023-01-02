const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  database: "Gamestore",
  password: "postgres",
  hostname: "port",
  port: 5432,
});

client.connect();

const getTable = async (tableName) => {
    return await client.query(`select * from "${tableName}"`);
};

const addValuesToTable = async (tableName, values) => {
    let listProps = Object.keys(values[0]);
    console.log('List', listProps);
    let query = `INSERT INTO "${tableName}" (${listProps.join(",")}) VALUES `;
    for (let value of values) {
      query += `(${Object.values(value).join(",")});`;
    }
    // query = query.substring(0, query.length-1)
    console.log(query)
  
    try {
      await client.query(query);
    } catch (ex) {
      console.log(ex);
    }
};

module.exports = {getTable, addValuesToTable};