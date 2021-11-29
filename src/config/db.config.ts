// import { join } from "path";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [__dirname + "/../**/*.entity.js"], // * for working on docker, if you work locally please change to join(__dirname, '**', '*.entity.{ts,js}')
  ssl: false,
  synchronize: true,
};

export default config;
