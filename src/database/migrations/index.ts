import { Migration } from "kysely";
import { Migration20250202 } from "./2025-02-02";
import { Migration20250205 } from "./2025-02-05";
import { Migration20250205Refs } from "./2025-02-05-refs";

export const migrations: Record<string, Migration> = {
  "2025-02-02": Migration20250202,
  "2025-02-05": Migration20250205,
  "2025-02-05-refs": Migration20250205Refs,
};
