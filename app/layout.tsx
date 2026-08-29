import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khandabi | Confectionery Machinery & Production Lines",
  description:
    "Industrial confectionery machinery, complete production lines, and process engineering by Khandabi.",
};

function SiteCatalogueLink() {
  return (
    <Link
      href="/machinery"
      className="fixed bottom-6 right-6 z-[100] border border-white/40 bg-[#111820] px-5 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-white shadow-2xl transition hover:bg-[#e76f32] hover:text-black md:bottom-8 md:right-8"
    >
      Machinery Catalogue ↗
    </Link>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <SiteCatalogueLink />
      </body>
    </html>
  );
}
