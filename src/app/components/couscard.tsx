"use client"

import { useState } from "react"
import { FiBookOpen, FiCalendar, FiDownload, FiEye, FiLayers, FiTrash2 } from "react-icons/fi"
import { SujetType, URL_API } from "../lib/api"
import { styleBoutonPrincipal, styleBoutonSecondaire, styleCarte } from "./ui"

type CoursCardProps = {
    sujet: SujetType
    // Si cette fonction est fournie, un bouton « Supprimer » est affiché (page profil)
    onSupprimer?: (sujet: SujetType) => void
}

const styleEtiquette = "inline-flex max-w-full items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"

export default function CoursCard({ sujet, onSupprimer }: CoursCardProps) {
    // Le compteur avance tout de suite au clic, sans recharger la liste
    const [telechargements, setTelechargements] = useState(sujet.telechargements)

    const date = new Date(sujet.dateCreation).toLocaleDateString("fr-FR")
    const format = sujet.fichier.split(".").pop()?.toUpperCase() || "PDF"
    // Seuls les PDF s'affichent dans le navigateur : pour un fichier Word, « Voir » lancerait un téléchargement
    const estPdf = format === "PDF"

    return (
        <article className={`${styleCarte} flex flex-col p-5 transition hover:border-slate-300 hover:shadow-md`}>
            <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-700">
                    {sujet.type}
                </span>
                <span className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[11px] font-medium text-slate-500">
                    {format}
                </span>
            </div>

            <h2 className="mt-3 line-clamp-2 break-words text-lg font-semibold leading-snug text-slate-900" title={sujet.titre}>
                {sujet.titre}
            </h2>
            {sujet.description && (
                <p className="mt-1.5 line-clamp-3 break-words text-sm text-slate-600">{sujet.description}</p>
            )}

            <ul className="mt-4 flex flex-wrap gap-2">
                <li className={styleEtiquette}>
                    <FiBookOpen className="shrink-0" aria-hidden />
                    <span className="sr-only">Matière : </span>
                    <span className="truncate">{sujet.matiere}</span>
                </li>
                <li className={styleEtiquette}>
                    <FiLayers className="shrink-0" aria-hidden />
                    <span className="sr-only">Niveau : </span>
                    <span className="truncate">{sujet.niveau}</span>
                </li>
                <li className={styleEtiquette}>
                    <FiCalendar className="shrink-0" aria-hidden />
                    <span className="sr-only">Année : </span>
                    {sujet.annee}
                </li>
            </ul>

            <div className="mt-auto pt-5">
                <p className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span className="min-w-0 truncate">
                        {sujet.utilisateur.prenom} {sujet.utilisateur.nom} · {date}
                    </span>
                    <span className="flex shrink-0 items-center gap-1" title="Nombre de téléchargements">
                        <FiDownload aria-hidden />
                        {telechargements}
                        <span className="sr-only"> téléchargements</span>
                    </span>
                </p>

                <div className="mt-3 flex gap-2">
                    {estPdf && (
                        <a
                            href={`${URL_API}/sujets/${sujet.id}/fichier`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styleBoutonSecondaire} flex-1 py-2 text-sm`}
                        >
                            <FiEye aria-hidden /> Voir
                        </a>
                    )}
                    <a
                        href={`${URL_API}/sujets/${sujet.id}/telecharger`}
                        onClick={() => setTelechargements(telechargements + 1)}
                        className={`${styleBoutonPrincipal} flex-1 py-2 text-sm`}
                    >
                        <FiDownload aria-hidden /> Télécharger
                    </a>
                    {onSupprimer && (
                        <button
                            onClick={() => onSupprimer(sujet)}
                            aria-label={`Supprimer le sujet ${sujet.titre}`}
                            title="Supprimer"
                            className="cursor-pointer rounded-lg border border-slate-300 px-3 text-red-600 transition hover:border-red-300 hover:bg-red-50"
                        >
                            <FiTrash2 aria-hidden />
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}
