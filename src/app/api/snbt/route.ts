import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: { paths: ["/api/snbt/find_by_number", "/api/snbt/find_by_name"] },
  });
}
