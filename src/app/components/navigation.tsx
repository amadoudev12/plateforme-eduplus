"use client"

import Link from "next/link"
import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import { usePathname, useRouter } from "next/navigation"
import { useUtilisateur } from "./utilisateurContext"
import { appelApi } from "../lib/api"

const linksNames = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Sujets", href: "/cours" },
    { name: "Contact", href: "/contact" },
    { name: "Depot", href: "/depot" },
    ]

export default function Navigation() {
    const [showMenu, setShowMenu] = useState(false)
    const { utilisateur, chargement, setUtilisateur } = useUtilisateur()
    const router = useRouter()

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const pathname = usePathname()

    const seDeconnecter = async () => {
        // Même si le serveur ne répond pas, on efface l'utilisateur côté navigateur
        await appelApi("/auth/deconnexion", { method: "POST" }).catch(() => {})
        setUtilisateur(null)
        setShowMenu(false)
        router.push("/")
    }

    return (
        <nav className="w-full px-6 md:px-12 py-4 bg-white shadow-md sticky top-0 z-50">
        {/* Partie principale : logo + desktop + bouton burger */}
        <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl text-blue-700 font-extrabold tracking-wide">
            EduPlus
            </Link>

            {/* Liens desktop */}
            <ul className="hidden md:flex items-center gap-4">
                {linksNames.map((link) => {
                const isActive = pathname === link.href
                return (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium px-3 py-2 rounded-md transition-all duration-200
                        ${isActive ? "text-blue-700 bg-blue-100" : "text-gray-700 hover:text-blue-700 hover:bg-blue-100"}`}
                    >
                    {link.name}
                    </Link>
                )
                })}

            </ul>

            {/* Compte : profil + déconnexion, ou connexion + inscription */}
            <div className="hidden md:flex items-center gap-3 min-w-40 justify-end">
            {!chargement && utilisateur && (
                <>
                <Link className="text-blue-700 font-semibold hover:underline" href="/profil">
                    {utilisateur.prenom}
                </Link>
                <button
                    onClick={seDeconnecter}
                    className="border border-blue-700 px-4 py-2 rounded-2xl text-blue-700 font-semibold hover:bg-blue-100 transition cursor-pointer"
                >
                    Déconnexion
                </button>
                </>
            )}
            {!chargement && !utilisateur && (
                <>
                <Link className="text-blue-700 font-semibold hover:underline" href="/connexion">
                    Connexion
                </Link>
                <Link
                    className="bg-blue-700 px-5 py-2 rounded-2xl text-white font-semibold hover:bg-blue-800 transition"
                    href="/inscription"
                >
                    S'inscrire
                </Link>
                </>
            )}
            </div>

            {/* Menu burger mobile */}
            <button className="md:hidden" onClick={toggleMenu} aria-label="Ouvrir le menu">
            <FiMenu className="text-3xl text-blue-700 cursor-pointer" />
            </button>
        </div>

        {/* Menu Mobile */}
        {showMenu && (
            <div className="md:hidden mt-4">
            <ul className="flex flex-col items-center gap-2">
                {linksNames.map((link) => (
                <Link
                    onClick={toggleMenu}
                    key={link.name}
                    href={link.href}
                    className="block text-gray-700 font-medium text-base px-4 py-2 w-full text-center hover:text-blue-700 hover:bg-blue-100 transition-all duration-200"
                >
                    {link.name}
                </Link>
                ))}
                {utilisateur ? (
                <>
                    <Link
                    onClick={toggleMenu}
                    href="/profil"
                    className="block text-blue-700 font-medium text-base px-4 py-2 w-full text-center hover:bg-blue-100 transition-all duration-200"
                    >
                    Mon profil ({utilisateur.prenom})
                    </Link>
                    <button
                    onClick={seDeconnecter}
                    className="mt-3 border border-blue-700 text-blue-700 px-6 py-2 rounded-full hover:bg-blue-100 transition"
                    >
                    Déconnexion
                    </button>
                </>
                ) : (
                <>
                    <Link
                    onClick={toggleMenu}
                    href="/connexion"
                    className="block text-blue-700 font-medium text-base px-4 py-2 w-full text-center hover:bg-blue-100 transition-all duration-200"
                    >
                    Connexion
                    </Link>
                    <Link
                    onClick={toggleMenu}
                    href="/inscription"
                    className="mt-3 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
                    >
                    S'inscrire
                    </Link>
                </>
                )}
            </ul>
            </div>
        )}
        </nav>
    )
}
