import { EntitySchema } from "typeorm";
import { Category } from "../model/category.js";

export default new EntitySchema(
    {
        tableName: "categories",
        target: Category,
        columns: {
            id: {
                primary: true,
                type: "int",
                generated: true
            },
            name: {
                type: "varchar"
            },
            route: {
                type: "varchar"
            }
        }
    }
)