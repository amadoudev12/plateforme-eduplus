"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import CoursCard from "../components/couscard"
import { useUtilisateur } from "../components/utilisateurContext"
import { appelApi, SujetType } from "../lib/api"

export default function Profil() {
    const { utilisateur, chargement } = useUtilisateur()
    const [sujets, setSujets] = useState<SujetType[]>([])
    const [chargementSujets, setChargementSujets] = useState(true)
    const [erreur, setErreur] = useState("")

    // Charger les sujets publiés par l'utilisateur connecté
    useEffect(() => {
        if (!utilisateur) return

        appelApi("/sujets/mes-sujets")
            .then(setSujets)
            .catch((e) => setErreur(e.message))
            .finally(() => setChargementSujets(false))
    }, [utilisateur])

    const supprimerSujet = async (sujet: SujetType) => {
        if (!confirm(`Supprimer définitivement le sujet « ${sujet.titre} » ?`)) return

        try {
            await appelApi(`/sujets/${sujet.id}`, { method: "DELETE" })
            setSujets(sujets.filter((s) => s.id !== sujet.id))
            setErreur("")
        } catch (e) {
            setErreur((e as Error).message)
        }
    }

    if (chargement) {
        return <p className="min-h-screen text-center text-gray-500 py-12">Chargement...</p>
    }

    // Le profil est réservé aux utilisateurs connectés
    if (!utilisateur) {
        return (
            <div className="min-h-screen px-4 py-12">
            <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">Mon profil</h1>
                <p className="text-gray-600 mb-6">Tu dois être connecté pour voir ton profil.</p>
                <Link href="/connexion" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded-md transition duration-300">
                Se connecter
                </Link>
            </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-7xl mx-auto">
        {/* Informations du compte */}
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mb-10">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Mon profil</h1>
            <p className="text-xl font-semibold text-center mb-4">{utilisateur.prenom} {utilisateur.nom}</p>
            <ul className="space-y-1 text-gray-700">
            <li className="break-words">Email : {utilisateur.email}</li>
            {utilisateur.niveau && <li className="break-words">Classe : {utilisateur.niveau}</li>}
            {utilisateur.etablissement && <li className="break-words">Établissement : {utilisateur.etablissement}</li>}
            <li>Inscrit le {new Date(utilisateur.dateCreation).toLocaleDateString("fr-FR")}</li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Mes sujets déposés</h2>

        {erreur && <p className="text-center text-red-600 font-semibold mb-6">{erreur}</p>}
        {chargementSujets && <p className="text-center text-gray-500">Chargement des sujets...</p>}

        {!chargementSujets && !erreur && sujets.length === 0 && (
            <p className="text-center text-gray-500">
            Tu n'as pas encore déposé de sujet.{" "}
            <Link href="/depot" className="text-blue-700 font-semibold hover:underline">Déposer un sujet</Link>
            </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sujets.map((sujet) => (
                <CoursCard key={sujet.id} sujet={sujet} onSupprimer={supprimerSujet} />
            ))}
        </div>
        </div>
        </div>
    )
}
