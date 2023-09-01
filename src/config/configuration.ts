import * as process from "process";

export default () => ({
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
});