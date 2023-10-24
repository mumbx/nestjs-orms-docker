import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCourseTable1698121228644 } from "src/migrations/1698121228644-CreateCourseTable";

export const dateSource = new DataSource({
    ...dataSourceOptions,
    migrations: [CreateCourseTable1698121228644]
})