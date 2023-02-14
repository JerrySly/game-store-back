import { DataSource } from 'typeorm';
import { open } from 'fs/promises';
import { User } from './entities/user';
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'GameStore',
  entities: [ User],
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
const useSQLScript = async (filePath: string) => {
  const createScript = await open(filePath);
  try {
    const content = await createScript.readFile();
    await dataSource.createQueryRunner().manager.query(content.toString('ascii'));
  } catch (e) {
    console.log(e);
  } finally {
    createScript.close();
  }
};



const createDefaultTables = async () => {
  await useSQLScript('./database/createTables.sql');
};


export { dataSource ,createDefaultTables };

