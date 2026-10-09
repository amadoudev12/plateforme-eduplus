"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUtilisateur } from "../components/utilisateurContext"
import { envoyerJson } from "../lib/api"

const styleChamp = "w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"

export default function Inscription() {
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [niveau, setNiveau] = useState("")
    const [etablissement, setEtablissement] = useState("")

    const [erreur, setErreur] = useState("")
    const [envoiEnCours, setEnvoiEnCours] = useState(false)
    const { setUtilisateur } = useUtilisateur()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErreur("")
        setEnvoiEnCours(true)

        try {
            const donnees = await envoyerJson("/auth/inscription", {
                prenom,
                nom,
                email,
                motDePasse,
                niveau,
                etablissement,
            })
            // Le backend connecte directement le nouvel utilisateur
            setUtilisateur(donnees.utilisateur)
            router.push("/cours")
        } catch (e) {
            setErreur((e as Error).message)
            setEnvoiEnCours(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label htmlFor="prenom" className="block mb-1 font-medium">Prénom</label>
                <input
                id="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                autoComplete="given-name"
                className={styleChamp}
                />
            </div>
            <div>
                <label htmlFor="nom" className="block mb-1 font-medium">Nom</label>
                <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                autoComplete="family-name"
                className={styleChamp}
                />
            </div>
            </div>
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
            <label htmlFor="motDePasse" className="block mb-1 font-medium">Mot de passe (8 caractères minimum)</label>
            <input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className={styleChamp}
            />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label htmlFor="niveau" className="block mb-1 font-medium">Classe ou niveau (facultatif)</label>
                <input
                id="niveau"
                type="text"
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                maxLength={60}
                placeholder="Terminale, Licence 1, etc."
                className={styleChamp}
                />
            </div>
            <div>
                <label htmlFor="etablissement" className="block mb-1 font-medium">Établissement (facultatif)</label>
                <input
                id="etablissement"
                type="text"
                value={etablissement}
                onChange={(e) => setEtablissement(e.target.value)}
                maxLength={100}
                className={styleChamp}
                />
            </div>
            </div>

            {erreur && <p className="text-center text-red-600 font-semibold">{erreur}</p>}

            <button
            type="submit"
            disabled={envoiEnCours}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-md transition duration-300 disabled:opacity-60 cursor-pointer"
            >
            {envoiEnCours ? "Inscription..." : "S'inscrire"}
            </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="text-blue-700 font-semibold hover:underline">Se connecter</Link>
        </p>
        </div>
        </div>
    )
}
