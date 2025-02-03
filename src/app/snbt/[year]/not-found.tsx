import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-12 min-h-screen items-center justify-center p-4">
      <div className="flex justify-center mb-4">
        <img src="/snpmb-logo.png" alt="SNPMPB Logo" className="h-16" />
      </div>
      <div className="w-full max-w-md bg-white px-16 py-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col gap-4">
        <div className="text-4xl font-semibold">Tahun tidak ditemukan</div>
        <div className="text-justify">Silahkan kembali ke laman utama dan pilih tahun yang benar</div>

        <Link
          href={"/"}
          className="w-full rounded-md bg-[#0092de] text-white font-semibold p-2 text-center hover:bg-[#0157ac] transition-all"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
