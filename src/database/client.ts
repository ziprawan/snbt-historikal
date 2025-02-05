import { DB } from "@/types/database/db";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";

const dialect = new LibsqlDialect({
    url: process.env.LIBSQL_URL ?? 'libsql://localhost:8080',
    authToken: process.env.LIBSQL_AUTH,
});

export const db = new Kysely<DB>({ dialect });
