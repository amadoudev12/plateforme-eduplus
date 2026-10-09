"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUtilisateur } from "../components/utilisateurContext"
import { envoyerJson } from "../lib/api"

const styleChamp = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

export default function Connexion() {
    const [email, setEmail] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [erreur, setErreur] = useState("")
    const [envoiEnCours, setEnvoiEnCours] = useState(false)
    const { setUtilisateur } = useUtilisateur()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErreur("")
        setEnvoiEnCours(true)

        try {
            const donnees = await envoyerJson("/auth/connexion", { email, motDePasse })
            setUtilisateur(donnees.utilisateur)
            router.push("/cours")
        } catch (e) {
            setErreur((e as Error).message)
            setEnvoiEnCours(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label htmlFor="email" className="block mb-1 font-medium">Adresse email</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="exemple@mail.com"
                className={styleChamp}
            />
            </div>
            <div>
            <label htmlFor="motDePasse" className="block mb-1 font-medium">Mot de passe</label>
            <input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                autoComplete="current-password"
                className={styleChamp}
            />
            </div>

            {erreur && <p className="text-center text-red-600 font-semibold">{erreur}</p>}

            <button
            type="submit"
            disabled={envoiEnCours}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-md transition duration-300 disabled:opacity-60 cursor-pointer"
            >
            {envoiEnCours ? "Connexion..." : "Se connecter"}
            </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-blue-700 font-semibold hover:underline">S'inscrire</Link>
        </p>
        </div>
        </div>
    )
}
