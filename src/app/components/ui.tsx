// Styles et petits composants partagés par toutes les pages, pour garder un design cohérent
import { FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi"

export const styleChamp =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"

const styleBouton =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"

export const styleBoutonPrincipal = `${styleBouton} bg-blue-700 text-white shadow-sm hover:bg-blue-800`
export const styleBoutonSecondaire = `${styleBouton} border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50`
export const styleBoutonDanger = `${styleBouton} bg-red-600 text-white shadow-sm hover:bg-red-700`

export const styleCarte = "rounded-2xl border border-slate-200 bg-white shadow-sm"
export const styleLien = "font-semibold text-blue-700 hover:underline"

// Largeur et marges communes à toutes les pages
export const stylePage = "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14"

type ChampProps = {
    label: string
    pour: string
    aide?: React.ReactNode
    facultatif?: boolean
    children: React.ReactNode
}

// Un champ de formulaire : son libellé, le champ lui-même et un texte d'aide éventuel
export function Champ({ label, pour, aide, facultatif, children }: ChampProps) {
    return (
        <div>
            <label htmlFor={pour} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-slate-700">
                <span>{label}</span>
                {facultatif && <span className="font-normal text-slate-400">Facultatif</span>}
            </label>
            {children}
            {aide && <p className="mt-1.5 text-sm text-slate-500">{aide}</p>}
        </div>
    )
}

// Message d'erreur ou de succès, annoncé aussi aux lecteurs d'écran
export function Alerte({ type, children }: { type: "erreur" | "succes"; children: React.ReactNode }) {
    const estErreur = type === "erreur"
    const Icone = estErreur ? FiAlertCircle : FiCheckCircle
    return (
        <div
            role={estErreur ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                estErreur ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"
            }`}
        >
            <Icone className="mt-0.5 shrink-0 text-base" aria-hidden />
            <div className="min-w-0 break-words">{children}</div>
        </div>
    )
}

export function Chargement({ texte = "Chargement..." }: { texte?: string }) {
    return (
        <p role="status" className="flex items-center justify-center gap-2 py-16 text-slate-500">
            <FiLoader className="animate-spin" aria-hidden />
            {texte}
        </p>
    )
}

type EtatVideProps = {
    icone: React.ReactNode
    titre: string
    texte: string
    children?: React.ReactNode
}

// Affiché à la place d'une liste vide : explique la situation et propose quoi faire
export function EtatVide({ icone, titre, texte, children }: EtatVideProps) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-700">
                {icone}
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{titre}</h2>
            <p className="mx-auto mt-1 max-w-md text-slate-500">{texte}</p>
            {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
    )
}

// Silhouette d'une carte de sujet, affichée pendant le chargement
export function CarteSquelette() {
    return (
        <div className={`${styleCarte} animate-pulse p-5`} aria-hidden>
            <div className="h-5 w-20 rounded-full bg-slate-200" />
            <div className="mt-4 h-5 w-4/5 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-full rounded bg-slate-100" />
            <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
            <div className="mt-5 flex gap-2">
                <div className="h-6 w-24 rounded-full bg-slate-100" />
                <div className="h-6 w-20 rounded-full bg-slate-100" />
            </div>
            <div className="mt-6 h-10 w-full rounded-lg bg-slate-200" />
        </div>
    )
}

// "1,2 Mo" ou "340 Ko"
export function formaterTaille(octets: number) {
    if (octets >= 1024 * 1024) {
        return (octets / (1024 * 1024)).toFixed(1).replace(".", ",") + " Mo"
    }
    return Math.max(1, Math.round(octets / 1024)) + " Ko"
}
