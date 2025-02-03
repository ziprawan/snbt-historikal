import { AnnualData } from "@/types/annual-data";
import { dateToDayFormatter } from "@/utils/date";
import Link from "next/link";

export default function HistoricalButton({ data }: { data: AnnualData }) {
  return (
    <Link
      href={`/snbt/${data.year}`}
      prefetch={false}
      className="flex justify-center cursor-pointer w-full rounded-md border border-black px-4 py-2 text-[#0d6efd] font-semibold hover:bg-gray-100"
    >
      {data.year} - {dateToDayFormatter(data.dumped_at * 1000)}
    </Link>
  );
}
