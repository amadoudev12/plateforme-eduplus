"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { FiCheck, FiInfo } from "react-icons/fi"
import AccesReserve from "../components/accesReserve"
import ZoneFichier from "../components/zoneFichier"
import { Alerte, Champ, Chargement, styleBoutonPrincipal, styleBoutonSecondaire, styleCarte, styleChamp, stylePage } from "../components/ui"
import { useUtilisateur } from "../components/utilisateurContext"
import { appelApi, majuscule, TYPES_SUJET } from "../lib/api"

const TITRE_MAX = 150
const DESCRIPTION_MAX = 1000

// Propositions affichées pendant la saisie : l'utilisateur reste libre d'écrire autre chose
const MATIERES_PROPOSEES = ["Algèbre", "Analyse", "Algorithmique", "Bases de données", "Programmation", "Droit civil", "Droit constitutionnel", "Microéconomie", "Macroéconomie", "Comptabilité", "Statistiques", "Thermodynamique"]
const NIVEAUX_PROPOSES = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "BTS 1", "BTS 2", "Doctorat"]

export default function DeposerExercice() {
    const { utilisateur, chargement } = useUtilisateur()

    const [titre, setTitre] = useState("")
    const [matiere, setMatiere] = useState("")
    const [niveau, setNiveau] = useState("")
    const [type, setType] = useState("")
    const [annee, setAnnee] = useState(String(new Date().getFullYear()))
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState<File | null>(null)

    const [depose, setDepose] = useState(false)
    const [erreur, setErreur] = useState("")
    const [envoiEnCours, setEnvoiEnCours] = useState(false)
    const zoneErreur = useRef<HTMLDivElement>(null)

    // Afficher l'erreur et la faire défiler à l'écran, car le formulaire est long sur mobile
    const signalerErreur = (message: string) => {
        setErreur(message)
        requestAnimationFrame(() => zoneErreur.current?.scrollIntoView({ behavior: "smooth", block: "center" }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErreur("")

        if (!fichier) {
            signalerErreur("Choisis le fichier du sujet.")
            return
        }

        // Un fichier ne peut pas être envoyé en JSON : on utilise FormData
        const donnees = new FormData()
        donnees.append("titre", titre)
        donnees.append("matiere", matiere)
        donnees.append("niveau", niveau)
        donnees.append("type", type)
        donnees.append("annee", annee)
        donnees.append("description", description)
        donnees.append("fichier", fichier)

        setEnvoiEnCours(true)
        try {
            await appelApi("/sujets", { method: "POST", body: donnees })
            setDepose(true)
            window.scrollTo({ top: 0 })
        } catch (e) {
            signalerErreur((e as Error).message)
        } finally {
            setEnvoiEnCours(false)
        }
    }

    // Vider le formulaire pour déposer un autre sujet (matière, niveau et année sont gardés : ils changent rarement)
    const deposerUnAutre = () => {
        setTitre("")
        setType("")
        setDescription("")
        setFichier(null)
        setDepose(false)
    }

    if (chargement) {
        return <Chargement />
    }

    // Le dépôt est réservé aux utilisateurs connectés
    if (!utilisateur) {
        return (
            <AccesReserve
                titre="Déposer un sujet"
                texte="Connecte-toi pour partager un sujet avec les autres étudiants."
                suite="/depot"
            />
        )
    }

    if (depose) {
        return (
            <div className={stylePage}>
                <div className={`${styleCarte} mx-auto max-w-md p-8 text-center`} role="status">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                        <FiCheck aria-hidden />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900">Sujet déposé, merci !</h1>
                    <p className="mt-2 break-words text-slate-600">
                        « {titre} » est maintenant disponible pour tous les étudiants.
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                        <Link href="/cours" className={styleBoutonPrincipal}>Voir les sujets</Link>
                        <button onClick={deposerUnAutre} className={styleBoutonSecondaire}>Déposer un autre sujet</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={stylePage}>
        <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Déposer un sujet</h1>
            <p className="mt-1 text-slate-600">Quelques informations suffisent pour que les autres le retrouvent facilement.</p>

            <form onSubmit={handleSubmit} className={`${styleCarte} mt-8 space-y-6 p-5 sm:p-8`}>
                <Champ label="Titre du sujet" pour="titre" aide={`${titre.length} / ${TITRE_MAX} caractères`}>
                    <input
                        id="titre"
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        required
                        maxLength={TITRE_MAX}
                        placeholder="Exemple : Partiel d'algèbre linéaire"
                        className={styleChamp}
                    />
                </Champ>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Champ label="Matière" pour="matiere">
                        <input
                            id="matiere"
                            type="text"
                            list="matieres"
                            value={matiere}
                            onChange={(e) => setMatiere(e.target.value)}
                            required
                            maxLength={60}
                            placeholder="Algorithmique, Droit civil..."
                            className={styleChamp}
                        />
                        <datalist id="matieres">
                            {MATIERES_PROPOSEES.map((m) => <option key={m} value={m} />)}
                        </datalist>
                    </Champ>
                    <Champ label="Niveau" pour="niveau">
                        <input
                            id="niveau"
                            type="text"
                            list="niveaux"
                            value={niveau}
                            onChange={(e) => setNiveau(e.target.value)}
                            required
                            maxLength={60}
                            placeholder="Licence 1, Master 2..."
                            className={styleChamp}
                        />
                        <datalist id="niveaux">
                            {NIVEAUX_PROPOSES.map((n) => <option key={n} value={n} />)}
                        </datalist>
                    </Champ>
                    <Champ label="Type de sujet" pour="type">
                        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required className={styleChamp}>
                            <option value="">Choisir un type</option>
                            {TYPES_SUJET.map((t) => (
                                <option key={t} value={t}>{majuscule(t)}</option>
                            ))}
                        </select>
                    </Champ>
                    <Champ label="Année" pour="annee">
                        <input
                            id="annee"
                            type="number"
                            inputMode="numeric"
                            value={annee}
                            onChange={(e) => setAnnee(e.target.value)}
                            required
                            min={1990}
                            max={new Date().getFullYear()}
                            className={styleChamp}
                        />
                    </Champ>
                </div>

                <Champ label="Description" pour="description" facultatif aide={`${description.length} / ${DESCRIPTION_MAX} caractères`}>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        maxLength={DESCRIPTION_MAX}
                        placeholder="Chapitres abordés, durée de l'épreuve, présence d'un corrigé..."
                        className={styleChamp}
                    />
                </Champ>

                <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-700">Fichier du sujet</p>
                    <ZoneFichier fichier={fichier} onChange={setFichier} />
                </div>

                {/* La règle est annoncée avant l'envoi, pour éviter un refus surprise */}
                <p className="flex items-start gap-2.5 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
                    <FiInfo className="mt-0.5 shrink-0 text-base" aria-hidden />
                    <span>
                        La matière, le titre, la description et le nom du fichier doivent parler du même sujet.
                        Un fichier nommé « droit_civil.pdf » déposé en Algèbre sera refusé.
                    </span>
                </p>

                <div ref={zoneErreur}>
                    {erreur && <Alerte type="erreur">{erreur}</Alerte>}
                </div>

                <button type="submit" disabled={envoiEnCours} className={`${styleBoutonPrincipal} w-full py-3`}>
                    {envoiEnCours ? "Envoi en cours..." : "Déposer le sujet"}
                </button>
            </form>
        </div>
        </div>
    )
}
