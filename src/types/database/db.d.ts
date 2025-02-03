import type { ColumnType } from "kysely";

type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type DB = {
  snbt_year: {
    id: Generated<number>;
    year: number;
    dumped_at: Generated<number>;
  };
  snbt_data: {
    id: Generated<number>;
    snbt_year: number;
    utbk_number: string;
    name: string;
    date_of_birth: string;
    is_scholarship: boolean;
    accepted: boolean;
    university_code: number | null;
    university_name: string | null;
    university_url: string | null;
    study_code: number | null;
    study_name: string | null;
  };
};
