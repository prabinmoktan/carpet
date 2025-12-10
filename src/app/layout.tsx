import type { Metadata } from "next";
import { Cormorant, Cormorant_Garamond, Playfair_Display_SC } from "next/font/google";
import "./globals.css";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
});

export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-sc',
});

export const metadata: Metadata = {
  title: "Company name",
  description: "Company Slogan  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${cormorant.variable} ${playfairDisplaySC.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
