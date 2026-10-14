"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiCalendar, FiHome, FiInbox, FiLayers, FiMail, FiUpload } from "react-icons/fi"
import AccesReserve from "../components/accesReserve"
import Confirmation from "../components/confirmation"
import CoursCard from "../components/couscard"
import { Alerte, CarteSquelette, Chargement, EtatVide, styleBoutonPrincipal, styleCarte, stylePage } from "../components/ui"
import { useUtilisateur } from "../components/utilisateurContext"
import { appelApi, SujetType } from "../lib/api"

export default function Profil() {
    const { utilisateur, chargement } = useUtilisateur()
    const [sujets, setSujets] = useState<SujetType[]>([])
    const [chargementSujets, setChargementSujets] = useState(true)
    const [erreur, setErreur] = useState("")

    // Sujet en attente de confirmation avant suppression
    const [aSupprimer, setASupprimer] = useState<SujetType | null>(null)
    const [suppressionEnCours, setSuppressionEnCours] = useState(false)

    // Charger les sujets publiés par l'utilisateur connecté
    useEffect(() => {
        if (!utilisateur) return

        appelApi("/sujets/mes-sujets")
            .then(setSujets)
            .catch((e) => setErreur(e.message))
            .finally(() => setChargementSujets(false))
    }, [utilisateur])

    const supprimerSujet = async () => {
        if (!aSupprimer) return

        setSuppressionEnCours(true)
        try {
            await appelApi(`/sujets/${aSupprimer.id}`, { method: "DELETE" })
            setSujets(sujets.filter((s) => s.id !== aSupprimer.id))
            setErreur("")
        } catch (e) {
            setErreur((e as Error).message)
        } finally {
            setSuppressionEnCours(false)
            setASupprimer(null)
        }
    }

    if (chargement) {
        return <Chargement />
    }

    // Le profil est réservé aux utilisateurs connectés
    if (!utilisateur) {
        return <AccesReserve titre="Mon profil" texte="Connecte-toi pour voir ton profil et tes sujets." suite="/profil" />
    }

    const telechargements = sujets.reduce((total, sujet) => total + sujet.telechargements, 0)
    const initiales = (utilisateur.prenom.charAt(0) + utilisateur.nom.charAt(0)).toUpperCase()

    return (
        <div className={stylePage}>
            {/* Informations du compte */}
            <section className={`${styleCarte} p-6 sm:p-8`}>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700" aria-hidden>
                        {initiales}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900">
                            {utilisateur.prenom} {utilisateur.nom}
                        </h1>
                        <ul className="mt-2 flex flex-col gap-x-5 gap-y-1 text-sm text-slate-600 sm:flex-row sm:flex-wrap">
                            <li className="flex min-w-0 items-center gap-1.5">
                                <FiMail className="shrink-0" aria-hidden />
                                <span className="truncate">{utilisateur.email}</span>
                            </li>
                            {utilisateur.niveau && (
                                <li className="flex items-center gap-1.5 break-words"><FiLayers className="shrink-0" aria-hidden />{utilisateur.niveau}</li>
                            )}
                            {utilisateur.etablissement && (
                                <li className="flex items-center gap-1.5 break-words"><FiHome className="shrink-0" aria-hidden />{utilisateur.etablissement}</li>
                            )}
                            <li className="flex items-center gap-1.5">
                                <FiCalendar className="shrink-0" aria-hidden />
                                Inscrit le {new Date(utilisateur.dateCreation).toLocaleDateString("fr-FR")}
                            </li>
                        </ul>
                    </div>
                    <Link href="/depot" className={`${styleBoutonPrincipal} shrink-0`}>
                        <FiUpload aria-hidden /> Déposer un sujet
                    </Link>
                </div>

                {/* Chiffres du compte */}
                {!chargementSujets && !erreur && (
                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:max-w-sm">
                        <div>
                            <dt className="text-sm text-slate-500">Sujets déposés</dt>
                            <dd className="text-2xl font-bold text-slate-900">{sujets.length}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-slate-500">Téléchargements</dt>
                            <dd className="text-2xl font-bold text-slate-900">{telechargements}</dd>
                        </div>
                    </dl>
                )}
            </section>

            <h2 className="mt-12 text-xl font-bold tracking-tight text-slate-900">Mes sujets déposés</h2>

            <div className="mt-5 space-y-5">
                {erreur && <Alerte type="erreur">{erreur}</Alerte>}

                {chargementSujets && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((n) => (
                            <CarteSquelette key={n} />
                        ))}
                    </div>
                )}

                {!chargementSujets && !erreur && sujets.length === 0 && (
                    <EtatVide
                        icone={<FiInbox aria-hidden />}
                        titre="Tu n'as pas encore déposé de sujet"
                        texte="Un ancien partiel ou un TD qui traîne ? Il peut servir à d'autres étudiants."
                    >
                        <Link href="/depot" className={styleBoutonPrincipal}>Déposer mon premier sujet</Link>
                    </EtatVide>
                )}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sujets.map((sujet) => (
                        <CoursCard key={sujet.id} sujet={sujet} onSupprimer={setASupprimer} />
                    ))}
                </div>
            </div>

            <Confirmation
                ouverte={aSupprimer !== null}
                titre="Supprimer ce sujet ?"
                texte={`« ${aSupprimer?.titre ?? ""} » et son fichier seront supprimés définitivement.`}
                libelleConfirmer="Supprimer"
                enCours={suppressionEnCours}
                onConfirmer={supprimerSujet}
                onAnnuler={() => setASupprimer(null)}
            />
        </div>
    )
}
