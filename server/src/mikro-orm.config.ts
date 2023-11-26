import { MikroORM } from "@mikro-orm/core";
import { CLIENT_URL, __prod__ } from "./constants"
import * as path from "path";
import { ItemEntity, UserEntity } from "./entities";

export default {
  migrations: {
    path: path.join(__dirname, "migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    tableName: 'mikro_orm_migrations'
  },
  dbName: "builtt",
  host: "localhost",
  type: "postgresql",
  password: "postgres",
  entities: [UserEntity, ItemEntity],
  debug: !__prod__,
  clientUrl: CLIENT_URL,
  seeder: {
    path: './seed',
    pathTs: undefined,
    defaultSeeder: "UsersSeeder",
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  }
} as Parameters<typeof MikroORM.init>[0];