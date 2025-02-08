import { z } from "zod";
import SNBTYearPage from "./client";
import { notFound } from "next/navigation";
import { db } from "@/database/client";

export default async function SNBTYearServerPage({ params, searchParams }: { params: Promise<{ year: string }>; searchParams: Promise<{ id: string }>; }) {
  const res = z
    .string()
    .regex(/\d*/)
    .length(4)
    .safeParse((await params).year);

  const rowid = z
    .string()
    .regex(/\d*/)
    .min(1)
    .safeParse((await searchParams).id);

  if (res.error || rowid.error) return notFound();

  const found = await db
    .selectFrom("snbt_year")
    .select("year")
    .where("year", "=", parseInt(res.data, 10))
    .where("id", "=", parseInt(rowid.data, 10))
    .executeTakeFirst();

  if (!found) return notFound();

  return <SNBTYearPage params={{ year: res.data, id: rowid.data }} />;
}
