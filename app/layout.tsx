import type { Metadata } from "next";
import { Geist, Geist_Mono, Creepster, Nosifer, Eater, Butcherman } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
});

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nosifer",
});

const eater = Eater({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-eater",
});

const butcherman = Butcherman({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-butcherman",
});

export const metadata: Metadata = {
  title: "SHIVIDTIDPHEE 2025",
  description: "VIDVAxBANSHI Halloween Event - Games, Schedule, and Registration",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${creepster.variable} ${nosifer.variable} ${eater.variable} ${butcherman.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
