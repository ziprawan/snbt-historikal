import { DB } from "@/types/database/db";
import { Kysely } from "kysely";
import { SqliteWorkerDialect } from "kysely-sqlite-worker";

const dialect = new SqliteWorkerDialect({ source: "data.db" });

export const db = new Kysely<DB>({ dialect });
