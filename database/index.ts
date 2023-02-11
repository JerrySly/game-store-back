import { User } from '../types/user';
import { open } from 'fs/promises';
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  database: 'Gamestore',
  password: 'postgres',
  hostname: 'port',
  port: 5432,
});

client.connect();

export const getTable = async <Type extends object>(
  tableName: string
): Promise<TableResult<Type>> => {
  return await client.query(`select * from "${tableName}"`);
};

export const addValuesToTable = async <Type extends object>(
  tableName: string,
  values: Array<Type>
) => {
  let listProps = Object.keys(values[0]);
  console.log('List', listProps);
  let query = `INSERT INTO "${tableName}" (${listProps.join(',')}) VALUES `;
  for (let value of values) {
    query += `(${Object.values(value).join(',')});`;
  }
  // query = query.substring(0, query.length-1)
  console.log(query);

  try {
    await client.query(query);
  } catch (ex) {
    console.log(ex);
  }
};

export const deleteValue = async <PrimaryType>(
  tableName: string,
  primaryKey: PrimaryType,
  primaryKeyName: string
) => {
  await client.query(
    `Delete * from ${tableName} Where ${primaryKeyName} = ${primaryKey}`
  );
};

export const useSQLScript = async (filePath: string) => {
  const createScript = await open(filePath);
  try {
    const content = await createScript.readFile();
    await client.query(content.toString('ascii'));
  } catch (e) {
    console.log(e);
  } finally {
    createScript.close();
  }
};

export const createDefaultTables = async () => {
  await useSQLScript('./database/createTables.sql');
};
