"use client";

import HistoricalButton from "@/components/HistoricalButton";
import { AnnualData } from "@/types/annual-data";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<AnnualData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/snbt/available_dumps")
      .then((resp) => {
        try {
          return resp.json();
        } catch (err) {
          console.error(err);
        }
      })
      .then((json) => {
        if (json && json.data) {
          setData(json.data.available_dumps);
          setLoading(false);
        }
      });
  }, []);

  return (
    <div className="flex flex-col gap-12 min-h-screen items-center justify-center p-4">
      <div className="flex justify-center mb-4">
        <img src="/snpmb-logo.png" alt="SNPMPB Logo" className="h-16" />
      </div>
      <div className="w-full max-w-md bg-white px-16 pt-6 pb-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-md">
        <div className="text-4xl font-semibold">Tahun Historikal</div>
        <div className="text-justify my-4">Silahkan klik data tahun yang tersedia di bawah ini</div>

        <div className="block text-[#7A747C] text-sm mb-4">Tahun</div>
        {loading ? (
          <div className="text-sm text-[#7A747C]">Memuat data...</div>
        ) : (
          <div className="flex flex-col gap-2">
            {data.map((d) => (
              <HistoricalButton key={d.year} data={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
