import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Historikal Data SNBT",
  description: "-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-poppins antialiased flex flex-col min-h-screen bg-[#FEFEFE]`}>
        <main className="flex-1">{children}</main>
        <div className="text-center bottom-0 text-gray-400 p-4">
          Situs ini tidak berafiliasi secara resmi dengan Pihak SNPMB.<br />
          Made with ❤️ by <Link href={'https://github.com/ziprawan'}>Aziz Ridhwan</Link> and <Link href={'https://github.com/hansputera'}>hansputera</Link>
        </div>
      </body>
    </html>
  );
}
