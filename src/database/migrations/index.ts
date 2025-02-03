import { Migration } from "kysely";
import { Migration20250202 } from "./2025-02-02";

export const migrations: Record<string, Migration> = {
  "2025-02-02": Migration20250202,
};
