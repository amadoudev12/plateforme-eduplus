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
  title: "EduPlus — Sujets d'examens et exercices gratuits",
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
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* Lien visible seulement au clavier, pour sauter le menu */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-blue-700 focus:shadow-lg"
        >
          Aller au contenu
        </a>
        <UtilisateurProvider>
          <Navigation/>
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer/>
        </UtilisateurProvider>
      </body>
    </html>
  );
}
