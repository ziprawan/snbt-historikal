"use client";

import { SNBTData } from "@/types/snbt-result";
import { dateToVersionFormatter } from "@/utils/date";
import { splitBirthDate, splitUTBKNumber } from "@/utils/split";
import Link from "next/link";
import React, { useState } from "react";

function ShowSNBTData({ data, year, reset }: { data: SNBTData; year: string; reset: () => void }) {
  return (
    <>
      <div className="flex flex-col gap-12 min-h-screen py-[5vh] px-[10vh]">
        <div className="mb-4 flex justify-between">
          <img src="/snpmb-logo.png" alt="SNPMPB Logo" className="h-16" />
          <div className="text-3xl">{dateToVersionFormatter(data.dumped_at * 1000)}</div>
        </div>
        <div>
          <div className="text-[#6D757C] font-semibold">Selamat datang,</div>
          <div className="font-semibold text-2xl">{data.name}</div>
          <div className="font-light text-[#6D757C]">
            <table>
              <tbody>
                <tr>
                  <td>Nomor peserta</td>
                  <td className="px-4">:</td>
                  <td>{splitUTBKNumber(data.utbk_number)}</td>
                </tr>
                <tr>
                  <td>Tanggal lahir</td>
                  <td className="px-4">:</td>
                  <td>{splitBirthDate(data.date_of_birth)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${data.accepted ? "text-[#0F0]" : "text-[#F00]"} text-3xl font-bold`}>
          {data.accepted ? `ANDA DINYATAKAN LULUS DALAM SNBT ${year}` : `ANDA DINYATAKAN TIDAK LULUS DALAM SNBT ${year}`}
        </div>

        {data.accepted ? (
          <div className="text-black text-2xl font-bold">
            <table>
              <tbody>
                <tr>
                  <td>PTN</td>
                  <td className="px-4">:</td>
                  <td>{data.university_name}</td>
                </tr>
                <tr>
                  <td>Program Studi</td>
                  <td className="px-4">:</td>
                  <td>{data.study_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}

        {data.is_scholarship ? (
          <div className="w-[50vw] text-red-500 font-semibold">
            Anda sebagai pendaftar Program Indonesia Pintar Pendidikan Tinggi, calon pemegang Kartu Indonesia Pintar Kuliah
            (KIP Kuliah) harus lolos verifikasi terhadap data akademik dan verifikasi data ekonomi melalui dokumen dan/atau
            kunjungan ke alamat tinggal Peserta.
          </div>
        ) : (
          <></>
        )}

        <div className="w-[50vw]">
          {data.accepted ? (
            <Link
              href={data.university_url as string}
              prefetch={false}
              target="_blank"
              className="cursor-pointer flex justify-center mt-4 bg-[#0092de] p-3 rounded-md text-white font-semibold transition-all hover:bg-[#0157ac]"
            >
              Situs pendaftaran ulang PTN
            </Link>
          ) : (
            <></>
          )}
          <div
            onClick={() => reset()}
            className="cursor-pointer flex justify-center mt-4 bg-[#0092de] p-3 rounded-md text-white font-semibold transition-all hover:bg-[#0157ac]"
          >
            Kembali ke pencarian
          </div>
        </div>
      </div>
    </>
  );
}

function NameAndDobForm({
  year,
  setData,
  setErrorCode,
}: {
  year: string;
  setData: React.Dispatch<SNBTData>;
  setErrorCode: React.Dispatch<number>;
}) {
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  function fetchData() {
    const searchParams = new URLSearchParams();
    searchParams.set("name", name);
    searchParams.set("birth", dob);
    searchParams.set("snbt_year", year);

    fetch("/api/snbt/find_by_name?" + searchParams.toString())
      .then((resp) => {
        if (resp.status !== 200) {
          return setErrorCode(resp.status);
        }

        try {
          return resp.json();
        } catch (err) {
          console.error(err);
          setErrorCode(-1);
        }
      })
      .then((json) => {
        if (json && json.data) {
          setData(json.data);
        }
      })
      .catch(() => setErrorCode(0));
  }

  return (
    <>
      <div className="block text-[#7A747C] text-sm">Nama</div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value ?? "")}
        className="w-full border border-black px-4 py-2 rounded-md mb-4 mt-1"
      />
      <div className="block text-[#7A747C] text-sm">
        Tanggal lahir (FORMAT <span className="font-bold">DDMMYYYY</span>)
      </div>
      <input
        value={dob}
        onChange={(e) => setDob(e.target.value ?? "")}
        className="w-full border border-black px-4 py-2 rounded-md mt-1"
      />
      <div className="flex justify-end w-full">
        <div
          onClick={fetchData}
          className="cursor-pointer flex justify-end mt-4 border border-black bg-[#0D6EFD] w-fit px-2 py-1 rounded-md text-white"
        >
          Cek
        </div>
      </div>
    </>
  );
}

function UtbkNumberForm({
  year,
  setData,
  setErrorCode,
}: {
  year: string;
  setData: React.Dispatch<SNBTData>;
  setErrorCode: React.Dispatch<number>;
}) {
  const [no, setNo] = useState<string>("");

  function fetchData() {
    const searchParams = new URLSearchParams();
    searchParams.set("utbk_number", no);
    searchParams.set("snbt_year", year);

    fetch("/api/snbt/find_by_number?" + searchParams.toString())
      .then((resp) => {
        if (resp.status !== 200) {
          return setErrorCode(resp.status);
        }

        try {
          return resp.json();
        } catch (err) {
          console.error(err);
          setErrorCode(-1);
        }
      })
      .then((json) => {
        if (json && json.data) {
          setData(json.data);
        }
      })
      .catch(() => setErrorCode(0));
  }

  return (
    <>
      <div className="block text-[#7A747C] text-sm">No. UTBK</div>
      <input
        value={no}
        onChange={(e) => setNo(e.target.value ?? "")}
        className="w-full border border-black px-4 py-2 rounded-md mb-4 mt-1"
      />
      <div className="flex justify-end w-full">
        <div
          onClick={fetchData}
          className="cursor-pointer flex justify-end mt-4 border border-black bg-[#0D6EFD] w-fit px-2 py-1 rounded-md text-white"
        >
          Cek
        </div>
      </div>
    </>
  );
}

export default function SNBTYearPage({ params: { year } }: { params: { year: string } }) {
  const [searchMode, setSearchMode] = useState<0 | 1>(0);
  const [data, setData] = useState<SNBTData | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  if (data !== null) {
    return (
      <ShowSNBTData
        data={data}
        year={year}
        reset={() => {
          setData(null);
          setErrorCode(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-12 min-h-screen items-center justify-center p-4">
      <div className="flex justify-center mb-4">
        <img src="/snpmb-logo.png" alt="SNPMPB Logo" className="h-16" />
      </div>
      <div className="w-full max-w-md bg-white px-16 pt-6 pb-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col gap-4">
        <div className="text-4xl font-semibold">Cek Historikal SNBT {year}</div>
        <div className="text-justify">Masukan nama dan tanggal lahir atau nomor UTBK SNPMB Anda</div>

        <div className="bg-[#0D6EFD] flex justify-center w-full rounded-xl overflow-hidden">
          <div
            onClick={() => {
              setSearchMode(0);
              setErrorCode(null);
            }}
            className={`${
              searchMode === 0 ? "bg-[#0048B3] " : ""
            }text-white flex w-full justify-center rounded-xl cursor-pointer`}
          >
            Nama dan TL
          </div>
          <div
            onClick={() => {
              setSearchMode(1);
              setErrorCode(null);
            }}
            className={`${
              searchMode === 1 ? "bg-[#0048B3] " : ""
            }text-white flex w-full justify-center rounded-xl cursor-pointer`}
          >
            No. UTBK
          </div>
        </div>

        {errorCode !== null && (
          <div className="text-red-600">
            {errorCode === -1
              ? "Terjadi kesalahan saat mengolah data dari server"
              : errorCode === 0
              ? "Terjadi kesalahan pada jaringan"
              : errorCode === 400
              ? "Coba cek kembali nama dan TTL atau nomor UTBK Anda dan pastikan sudah sesuai format"
              : errorCode === 404
              ? "Data tidak ditemukan. Cek kembali nama dan TTL atau nomor UTBK Anda"
              : errorCode === 425
              ? "Terlalu awal untuk mengambil data ini"
              : "Terjadi kesalahan di dalam server"}
          </div>
        )}

        <div>
          {searchMode === 0 ? (
            <NameAndDobForm setData={setData} setErrorCode={setErrorCode} year={year} />
          ) : (
            <UtbkNumberForm setData={setData} setErrorCode={setErrorCode} year={year} />
          )}
        </div>
      </div>
    </div>
  );
}
