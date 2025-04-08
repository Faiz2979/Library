import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

const Oxaniums = Oxanium({
  weight: ["200", "400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Booko | Dashboard",
  description: "Book Borrowing System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Oxaniums.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
