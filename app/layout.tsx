import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Instrument_Serif, Nunito } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digitalizi — Solutions IT pour entreprises modernes",
  description:
    "Digitalizi accompagne les entreprises ambitieuses dans la conception, le développement et l'exploitation de leurs systèmes critiques. Logiciels, données, sécurité — un partenaire unique, des résultats mesurables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${nunito.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
