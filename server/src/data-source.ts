import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    name: "default",
    type: "mongodb",
    url: 'mongodb+srv://bad-bank-root:gkv%2Aruz4uzu1HEH3ejv@cluster0.uuqtkxy.mongodb.net/bad-bank?retryWrites=true&w=majority',
    synchronize: true,
    logging: false,
    entities: [
        `${__dirname}/entity/**/*.{ts,js}`
    ],
    migrations: [
        `${__dirname}//migration/**/*.{ts,js}`
    ],
    subscribers: [
        `${__dirname}//subscriber/**/*.{ts,js}`
    ],
});
