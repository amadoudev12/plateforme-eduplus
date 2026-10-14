"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiMenu, FiX, FiLogOut, FiUpload } from "react-icons/fi"
import { usePathname, useRouter } from "next/navigation"
import { useUtilisateur } from "./utilisateurContext"
import { appelApi } from "../lib/api"

const liens = [
    { nom: "Accueil", href: "/" },
    { nom: "Sujets", href: "/cours" },
    { nom: "À propos", href: "/about" },
    { nom: "Contact", href: "/contact" },
]

export default function Navigation() {
    const [menuOuvert, setMenuOuvert] = useState(false)
    const { utilisateur, chargement, setUtilisateur } = useUtilisateur()
    const router = useRouter()
    const pathname = usePathname()

    // Le menu mobile se referme dès qu'on change de page
    useEffect(() => {
        setMenuOuvert(false)
    }, [pathname])

    const seDeconnecter = async () => {
        // Même si le serveur ne répond pas, on efface l'utilisateur côté navigateur
        await appelApi("/auth/deconnexion", { method: "POST" }).catch(() => {})
        setUtilisateur(null)
        setMenuOuvert(false)
        router.push("/")
    }

    const styleLien = (href: string) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
            pathname === href ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`

    const initiale = utilisateur?.prenom.charAt(0).toUpperCase()

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav aria-label="Navigation principale" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-700">
                EduPlus
            </Link>

            {/* Liens desktop */}
            <ul className="hidden items-center gap-1 md:flex">
                {liens.map((lien) => (
                    <li key={lien.href}>
                        <Link href={lien.href} aria-current={pathname === lien.href ? "page" : undefined} className={styleLien(lien.href)}>
                            {lien.nom}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Compte : dépôt + profil + déconnexion, ou connexion + inscription */}
            <div className="hidden min-w-56 items-center justify-end gap-2 md:flex">
                {!chargement && utilisateur && (
                    <>
                    <Link href="/depot" className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                        <FiUpload aria-hidden /> Déposer
                    </Link>
                    <Link href="/profil" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700" aria-hidden>
                            {initiale}
                        </span>
                        <span className="max-w-24 truncate">{utilisateur.prenom}</span>
                    </Link>
                    <button
                        onClick={seDeconnecter}
                        aria-label="Se déconnecter"
                        title="Se déconnecter"
                        className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <FiLogOut aria-hidden />
                    </button>
                    </>
                )}
                {!chargement && !utilisateur && (
                    <>
                    <Link href="/connexion" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                        Connexion
                    </Link>
                    <Link href="/inscription" className="rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                        S&apos;inscrire
                    </Link>
                    </>
                )}
            </div>

            {/* Bouton du menu mobile */}
            <button
                className="cursor-pointer rounded-lg p-2 text-2xl text-slate-700 transition hover:bg-slate-100 md:hidden"
                onClick={() => setMenuOuvert(!menuOuvert)}
                aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOuvert}
                aria-controls="menu-mobile"
            >
                {menuOuvert ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
            </button>
        </nav>

        {/* Menu mobile */}
        {menuOuvert && (
            <div id="menu-mobile" className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden">
                <ul className="flex flex-col gap-1">
                    {liens.map((lien) => (
                        <li key={lien.href}>
                            <Link href={lien.href} aria-current={pathname === lien.href ? "page" : undefined} className={`block ${styleLien(lien.href)} text-base`}>
                                {lien.nom}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
                    {utilisateur ? (
                        <>
                        <Link href="/depot" className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white">
                            <FiUpload aria-hidden /> Déposer un sujet
                        </Link>
                        <Link href="/profil" className="rounded-lg border border-slate-300 px-4 py-2.5 text-center font-semibold text-slate-700">
                            Mon profil ({utilisateur.prenom})
                        </Link>
                        <button onClick={seDeconnecter} className="cursor-pointer rounded-lg px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-100">
                            Se déconnecter
                        </button>
                        </>
                    ) : (
                        <>
                        <Link href="/inscription" className="rounded-lg bg-blue-700 px-4 py-2.5 text-center font-semibold text-white">
                            Créer un compte
                        </Link>
                        <Link href="/connexion" className="rounded-lg border border-slate-300 px-4 py-2.5 text-center font-semibold text-slate-700">
                            Connexion
                        </Link>
                        </>
                    )}
                </div>
            </div>
        )}
        </header>
    )
}
