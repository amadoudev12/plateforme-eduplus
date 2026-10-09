import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "../app/components/navigation"
import Footer from "../app/components/footer"
import { UtilisateurProvider } from "../app/components/utilisateurContext"
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edu-plus",
  description: "La plateforme éducative pour trouver, déposer et télécharger gratuitement des sujets.",
    icons: {
    icon: "/image/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UtilisateurProvider>
          <Navigation/>
          {children}
          <Footer/>
        </UtilisateurProvider>
      </body>
    </html>
  );
}
