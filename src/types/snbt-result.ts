export type SNBTData = {
  id: number;
  snbt_year: number;
  utbk_number: string;
  name: string;
  date_of_birth: string;
  is_scholarship: 0 | 1 | boolean;
  accepted: 0 | 1 | boolean;
  university_code: number | null;
  university_name: string | null;
  university_url: string | null;
  study_code: number | null;
  study_name: string | null;
  dumped_at: number;
};

export type SNBTResponse = {
  data: SNBTData | null;
  query_time_ms: number;
};
