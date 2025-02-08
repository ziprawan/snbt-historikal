import { Migration } from "kysely";
import { Migration20250205Refs } from "./2025-02-05-refs";

export const migrations: Record<string, Migration> = {
  "2025-02-05": Migration20250205Refs,
};
