import type { Metadata } from "next";
import {
  Instrument_Sans,
  Bricolage_Grotesque,
  Fraunces,
  Syne,
  EB_Garamond,
  Oswald,
} from "next/font/google";
import "./globals.css";

const fontInstrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const fontBricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const fontFraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const fontSyne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const fontGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const fontOswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Platform",
  description: "A modern blogging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${fontInstrument.variable} 
        ${fontBricolage.variable} 
        ${fontFraunces.variable} 
        ${fontSyne.variable} 
        ${fontGaramond.variable}
        ${fontOswald.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
