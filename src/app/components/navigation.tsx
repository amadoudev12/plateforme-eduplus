"use client"

import Link from "next/link"
import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import { usePathname } from "next/navigation"

const linksNames = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cours", href: "/cours" },
    { name: "Contact", href: "/contact" },
    { name: "Depot", href: "/depot" },
    ]

export default function Navigation() {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const pathname = usePathname()

    return (
        <nav className="w-full px-6 md:px-12 py-4 bg-white shadow-md sticky top-0 z-50">
        {/* Partie principale : logo + desktop + bouton burger */}
        <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <h1 className="text-2xl md:text-3xl text-blue-700 font-extrabold tracking-wide">
            EduPlus
            </h1>

            {/* Liens desktop */}
            <ul className="hidden md:flex items-center gap-4">
                {linksNames.map((link) => {
                const isActive = pathname === link.href
                console.log(pathname +"|"+isActive)
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

            {/* Bouton d'inscription */}
            <div className="hidden md:flex">
            <Link
                className="bg-blue-700 px-5 py-2 rounded-2xl text-white font-semibold hover:bg-blue-800 transition"
                href="/register"
            >
                S'inscrire
            </Link>
            </div>

            {/* Menu burger mobile */}
            <div className="md:hidden">
            <FiMenu
                className="text-3xl text-blue-700 cursor-pointer"
                onClick={toggleMenu}
            />
            </div>
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
                <Link
                href="/register"
                className="mt-3 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
                >
                S'inscrire
                </Link>
            </ul>
            </div>
        )}
        </nav>
    )
}
