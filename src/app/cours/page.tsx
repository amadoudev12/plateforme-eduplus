"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiInbox, FiSearch, FiUpload, FiX } from "react-icons/fi"
import CoursCard from "../../app/components/couscard"
import { Alerte, CarteSquelette, EtatVide, styleBoutonPrincipal, styleBoutonSecondaire, styleCarte, styleChamp, stylePage } from "../components/ui"
import { appelApi, majuscule, SujetType, TYPES_SUJET } from "../lib/api"

const styleLibelle = "mb-1.5 block text-sm font-medium text-slate-700"

export default function ListeDesSujets() {
    const [sujets, setSujets] = useState<SujetType[]>([])
    const [chargement, setChargement] = useState(true)
    // Vrai tant qu'aucune réponse n'est arrivée : on affiche alors des silhouettes de cartes
    const [premierChargement, setPremierChargement] = useState(true)
    const [erreur, setErreur] = useState("")
    // Augmenter ce nombre relance la recherche (bouton « Réessayer »)
    const [essai, setEssai] = useState(0)

    // Filtres de recherche
    const [recherche, setRecherche] = useState("")
    const [matiere, setMatiere] = useState("")
    const [niveau, setNiveau] = useState("")
    const [type, setType] = useState("")
    const [annee, setAnnee] = useState("")

    const filtresActifs = Boolean(recherche || matiere || niveau || type || annee)

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
                    if (annule) return
                    setChargement(false)
                    setPremierChargement(false)
                })
        }, 300)

        return () => {
            annule = true
            clearTimeout(attente)
        }
    }, [recherche, matiere, niveau, type, annee, essai])

    const effacerFiltres = () => {
        setRecherche("")
        setMatiere("")
        setNiveau("")
        setType("")
        setAnnee("")
    }

    const nombre = sujets.length
    const resume = nombre === 0 ? "Aucun sujet" : nombre === 1 ? "1 sujet trouvé" : `${nombre} sujets trouvés`

    return (
        <div className={stylePage}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tous les sujets</h1>
                    <p className="mt-1 text-slate-600">Partiels, examens, TD et concours déposés par les étudiants.</p>
                </div>
                <Link href="/depot" className={`${styleBoutonPrincipal} self-start sm:self-auto`}>
                    <FiUpload aria-hidden /> Déposer un sujet
                </Link>
            </div>

            {/* Recherche et filtres */}
            <form role="search" onSubmit={(e) => e.preventDefault()} className={`${styleCarte} mt-8 p-4 sm:p-5`}>
                <label htmlFor="recherche" className="sr-only">Rechercher un sujet</label>
                <div className="relative">
                    <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
                    <input
                        id="recherche"
                        type="search"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par titre ou description..."
                        className={`${styleChamp} py-3 pl-10`}
                    />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label htmlFor="filtre-matiere" className={styleLibelle}>Matière</label>
                        <input
                            id="filtre-matiere"
                            type="text"
                            value={matiere}
                            onChange={(e) => setMatiere(e.target.value)}
                            placeholder="Algèbre, Droit civil..."
                            className={styleChamp}
                        />
                    </div>
                    <div>
                        <label htmlFor="filtre-niveau" className={styleLibelle}>Niveau</label>
                        <input
                            id="filtre-niveau"
                            type="text"
                            value={niveau}
                            onChange={(e) => setNiveau(e.target.value)}
                            placeholder="Licence 1, Master 2..."
                            className={styleChamp}
                        />
                    </div>
                    <div>
                        <label htmlFor="filtre-type" className={styleLibelle}>Type</label>
                        <select id="filtre-type" value={type} onChange={(e) => setType(e.target.value)} className={styleChamp}>
                            <option value="">Tous les types</option>
                            {TYPES_SUJET.map((t) => (
                                <option key={t} value={t}>{majuscule(t)}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filtre-annee" className={styleLibelle}>Année</label>
                        <input
                            id="filtre-annee"
                            type="number"
                            inputMode="numeric"
                            min={1990}
                            max={new Date().getFullYear()}
                            value={annee}
                            onChange={(e) => setAnnee(e.target.value)}
                            placeholder={String(new Date().getFullYear())}
                            className={styleChamp}
                        />
                    </div>
                </div>
            </form>

            {/* Nombre de résultats */}
            <div className="mt-6 flex min-h-9 flex-wrap items-center justify-between gap-3">
                <p aria-live="polite" className="text-sm text-slate-600">
                    {erreur ? "" : chargement ? "Recherche en cours..." : resume}
                </p>
                {filtresActifs && (
                    <button
                        onClick={effacerFiltres}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                        <FiX aria-hidden /> Effacer les filtres
                    </button>
                )}
            </div>

            <div className="mt-4">
                {erreur && (
                    <div className="space-y-4">
                        <Alerte type="erreur">{erreur}</Alerte>
                        <button onClick={() => setEssai(essai + 1)} className={styleBoutonSecondaire}>
                            Réessayer
                        </button>
                    </div>
                )}

                {!erreur && premierChargement && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <CarteSquelette key={n} />
                        ))}
                    </div>
                )}

                {/* Aucun résultat */}
                {!erreur && !chargement && nombre === 0 && (
                    filtresActifs ? (
                        <EtatVide
                            icone={<FiSearch aria-hidden />}
                            titre="Aucun sujet ne correspond"
                            texte="Essaie avec moins de filtres ou un mot plus court : « algo » trouve aussi « Algorithmique »."
                        >
                            <button onClick={effacerFiltres} className={styleBoutonSecondaire}>Effacer les filtres</button>
                        </EtatVide>
                    ) : (
                        <EtatVide
                            icone={<FiInbox aria-hidden />}
                            titre="Aucun sujet pour l'instant"
                            texte="Sois la première personne à partager un sujet avec les autres étudiants."
                        >
                            <Link href="/depot" className={styleBoutonPrincipal}>Déposer un sujet</Link>
                        </EtatVide>
                    )
                )}

                {/* Pendant une nouvelle recherche, les anciens résultats restent visibles mais atténués */}
                {!erreur && nombre > 0 && (
                    <div className={`grid gap-5 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${chargement ? "opacity-50" : ""}`}>
                        {sujets.map((sujet) => (
                            <CoursCard key={sujet.id} sujet={sujet} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
