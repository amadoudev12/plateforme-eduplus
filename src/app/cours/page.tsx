"use client"

import { useEffect, useState } from "react"
import CoursCard from "../../app/components/couscard"
import { appelApi, SujetType, TYPES_SUJET } from "../lib/api"

const styleFiltre = "w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"

export default function ListeDesSujets() {
    const [sujets, setSujets] = useState<SujetType[]>([])
    const [chargement, setChargement] = useState(true)
    const [erreur, setErreur] = useState("")

    // Filtres de recherche
    const [recherche, setRecherche] = useState("")
    const [matiere, setMatiere] = useState("")
    const [niveau, setNiveau] = useState("")
    const [type, setType] = useState("")
    const [annee, setAnnee] = useState("")

    const filtresActifs = recherche || matiere || niveau || type || annee

    // Relancer la recherche à chaque changement de filtre
    useEffect(() => {
        let annule = false

        // On attend un court instant pour ne pas lancer une recherche à chaque lettre tapée
        const attente = setTimeout(() => {
            const filtres = new URLSearchParams()
            if (recherche) filtres.set("recherche", recherche)
            if (matiere) filtres.set("matiere", matiere)
            if (niveau) filtres.set("niveau", niveau)
            if (type) filtres.set("type", type)
            if (annee) filtres.set("annee", annee)

            setChargement(true)
            appelApi("/sujets?" + filtres.toString())
                .then((resultat) => {
                    // Si un filtre a changé entre-temps, on ignore cette réponse devenue inutile
                    if (annule) return
                    setSujets(resultat)
                    setErreur("")
                })
                .catch((e) => {
                    if (!annule) setErreur(e.message)
                })
                .finally(() => {
                    if (!annule) setChargement(false)
                })
        }, 300)

        return () => {
            annule = true
            clearTimeout(attente)
        }
    }, [recherche, matiere, niveau, type, annee])

    const effacerFiltres = () => {
        setRecherche("")
        setMatiere("")
        setNiveau("")
        setType("")
        setAnnee("")
    }

    return (
        <div className="p-6 mb-12.5 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Tous les sujets disponibles</h1>

        {/* Recherche et filtres */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un sujet..."
            aria-label="Rechercher un sujet"
            className={`${styleFiltre} sm:col-span-2 lg:col-span-1`}
            />
            <input
            type="text"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            placeholder="Matière"
            aria-label="Matière"
            className={styleFiltre}
            />
            <input
            type="text"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            placeholder="Niveau (Terminale, Licence 1...)"
            aria-label="Niveau"
            className={styleFiltre}
            />
            <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Type de sujet" className={`${styleFiltre} capitalize`}>
            <option value="">Tous les types</option>
            {TYPES_SUJET.map((t) => (
                <option key={t} value={t}>{t}</option>
            ))}
            </select>
            <input
            type="number"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            placeholder="Année"
            aria-label="Année"
            className={styleFiltre}
            />
        </div>

        {erreur && <p className="text-center text-red-600 font-semibold mb-6">{erreur}</p>}

        {!erreur && (
            <p className="text-sm text-gray-500 mb-4">
            {chargement ? "Chargement des sujets..." : `${sujets.length} sujet(s) trouvé(s)`}
            {filtresActifs && (
                <button onClick={effacerFiltres} className="ml-3 text-blue-700 font-medium hover:underline cursor-pointer">
                Effacer les filtres
                </button>
            )}
            </p>
        )}

        {/* Aucun résultat */}
        {!chargement && !erreur && sujets.length === 0 && (
            <p className="text-center text-gray-500 py-12">
            {filtresActifs
                ? "Aucun sujet ne correspond à ta recherche."
                : "Aucun sujet n'a encore été déposé."}
            </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sujets.map((sujet) => (
                <CoursCard key={sujet.id} sujet={sujet} />
            ))}
        </div>
        </div>
        </div>
    )
}
