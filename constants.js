import CategorySchema from "./entities/category_schema.js";

export default  {
    BASE_URL: "https://www.digikala.com/",
    CONNECTION_CONFIG : {
        "type": "mysql",
        "host": "127.0.0.1",
        "port": 3306,
        "username": "kotlinbyte",
        "password": "123",
        "database": "Digikala",
        "logging": false,
        "synchronize": true,
        "migrationsRun": true,
        entities: [
            CategorySchema,
        ]
    }
};
