import { db } from "@/database/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const r1 = performance.now();
    const availableYears = await db.selectFrom("snbt_year").selectAll().orderBy("snbt_year.year desc").execute();
    const r2 = performance.now();

    return NextResponse.json({
      data: {
        available_dumps: availableYears.map((data) => ({ year: data.year, dumped_at: data.dumped_at })),
        query_time_ms: r2 - r1,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: { message: "Internal server error." } });
  }
}
