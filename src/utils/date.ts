export function dateToDayFormatter(num: number | null): string {
  if (!num) return "SNBT";

  const date = new Date(num);
  const formatter = new Intl.DateTimeFormat("id-ID", { year: "numeric", month: "short", day: "2-digit" });

  return ("SNBT DUMP (" + formatter.format(date) + ")").toUpperCase();
}

export function dateToVersionFormatter(num: number | null): string {
  if (!num) return "SND";

  const date = new Date(num);

  return (
    "SD-" +
    date.getDate().toString().padStart(2, "0") +
    date.getMonth().toString().padStart(2, "0") +
    date.getFullYear().toString().slice(2)
  );
}
