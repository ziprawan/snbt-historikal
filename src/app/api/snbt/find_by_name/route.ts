import { db } from "@/database/client";
import { SNBTResponse } from "@/types/snbt-result";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  name: z.string().min(3),
  snbt_year: z.coerce.number().min(2000).max(3000),
  birth: z.string().regex(/\d*/, "Received string cannot be converted to a number").length(8),
});

export async function GET(req: NextRequest) {
  try {
    const name = new URL(req.url).searchParams.get("name");
    const birth = new URL(req.url).searchParams.get("birth");
    const snbt_year = new URL(req.url).searchParams.get("snbt_year");
    const checkResult = querySchema.safeParse({ name, birth, snbt_year });

    if (checkResult.error) {
      return NextResponse.json({ error: { message: "Invalid query", errors: checkResult.error.issues } }, { status: 400 });
    }

    const r1 = performance.now();
    const year = await db
      .selectFrom("snbt_year as sy")
      .selectAll()
      .where("sy.year", "=", checkResult.data.snbt_year)
      .executeTakeFirst();
    const r2 = performance.now();

    if (!year) return NextResponse.json({ data: null, query_time_ms: r2 - r1 }, { status: 404 });
    if (Date.now() < year.dumped_at * 1000) return NextResponse.json({ error: { message: "Too Early" } }, { status: 425 });

    const found = await db
      .selectFrom("snbt_data as sd")
      .selectAll()
      .where("sd.name", "like", checkResult.data.name)
      .where("sd.date_of_birth", "=", birth)
      .where("sd.snbt_year", "=", checkResult.data.snbt_year)
      .executeTakeFirst();
    const r3 = performance.now();

    return NextResponse.json<SNBTResponse>(
      {
        data: found ? { ...found, dumped_at: year.dumped_at } : null,
        query_time_ms: r3 - r1,
      },
      { status: found ? 200 : 404 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: { message: "Internal server error." } }, { status: 500 });
  }
}
