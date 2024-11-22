import * as dotenv from "dotenv";

import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["dist/**/*.entity.js"],
    migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;