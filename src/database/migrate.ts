/// Reference: https://sqlocal.dallashoffman.com/kysely/migrations
import { Migrator } from "kysely";
import { db } from "./client";
import { migrations } from "./migrations";

const migrator = new Migrator({
  db: db,
  provider: {
    async getMigrations() {
      return migrations;
    },
  },
});

async function migrate() {
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration ${it.migrationName} was executed successfully!`);
    } else if (it.status === "Error") {
      console.error(`Failed to execute migration ${it.migrationName}!`);
    } else {
      console.log(`Migration ${it.migrationName} is not executed!`);
    }
  });

  if (error) {
    console.error(`Failed to execute all migration(s)!`);
    console.error(error);
    console.error("Exiting...");
    console.error("Something went wrong when doing database migration!");
    console.error(error);
    throw new Error(`Process exited caused by failed migration`);
  }
}

migrate().finally(() => {
  console.log("Done!");
  process.exit();
});
