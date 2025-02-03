import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
      <body className={`${poppins.className} font-poppins antialiased flex flex-col min-h-screen`}>
        <main className="flex-1">{children}</main>
        <div className="fixed w-full text-center bottom-0 text-gray-400 p-4">
          Situs ini tidak berafiliasi secara resmi dengan Pihak SNPMB
        </div>
      </body>
    </html>
  );
}
