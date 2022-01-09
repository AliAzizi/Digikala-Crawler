import CategorySchema from "./entities/category_schema.js";

export default  {
    BASE_URL: "https://www.digikala.com/",
    BASE_API_URL: "https://sirius.digikala.com/v1/",
    CONNECTION_CONFIG : {
        "type": "mysql",
        "host": "127.0.0.1",
        "port": 3306,
        "username": "kotlinbyte",
        "password": "123",
        "database": "Digikala",
        "logging": false,
        "synchronize": false,
        "migrationsRun": false,
        entities: [
            CategorySchema,
        ]
    }
};
