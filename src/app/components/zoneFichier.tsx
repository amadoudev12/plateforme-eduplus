"use client"

import { useRef, useState } from "react"
import { FiFileText, FiUploadCloud, FiX } from "react-icons/fi"
import { formaterTaille } from "./ui"

const EXTENSIONS_AUTORISEES = [".pdf", ".doc", ".docx"]
const TAILLE_MAX = 5 * 1024 * 1024 // 5 Mo, comme sur le backend

type ZoneFichierProps = {
    fichier: File | null
    onChange: (fichier: File | null) => void
}

// Zone pour choisir le fichier du sujet, par clic ou en le glissant dessus.
// Le format et la taille sont vérifiés tout de suite, sans attendre l'envoi du formulaire.
export default function ZoneFichier({ fichier, onChange }: ZoneFichierProps) {
    const [survol, setSurvol] = useState(false)
    const [erreur, setErreur] = useState("")
    const champ = useRef<HTMLInputElement>(null)

    const choisir = (nouveau: File | undefined) => {
        if (!nouveau) return

        const extension = nouveau.name.slice(nouveau.name.lastIndexOf(".")).toLowerCase()
        if (!EXTENSIONS_AUTORISEES.includes(extension)) {
            setErreur("Ce format n'est pas accepté : choisis un fichier PDF, DOC ou DOCX.")
            return onChange(null)
        }
        if (nouveau.size > TAILLE_MAX) {
            setErreur(`Ce fichier pèse ${formaterTaille(nouveau.size)} : la limite est de 5 Mo.`)
            return onChange(null)
        }
        setErreur("")
        onChange(nouveau)
    }

    const retirer = () => {
        onChange(null)
        if (champ.current) champ.current.value = ""
    }

    return (
        <div>
            {/* Le vrai champ est masqué mais reste accessible au clavier */}
            <input
                id="fichier"
                ref={champ}
                type="file"
                accept={EXTENSIONS_AUTORISEES.join(",")}
                onChange={(e) => choisir(e.target.files?.[0])}
                className="peer sr-only"
                tabIndex={fichier ? -1 : 0}
            />

            {fichier ? (
                <div className="flex items-center gap-3 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3">
                    <FiFileText className="shrink-0 text-2xl text-blue-700" aria-hidden />
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-slate-900">{fichier.name}</p>
                        <p className="text-sm text-slate-500">{formaterTaille(fichier.size)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={retirer}
                        aria-label="Retirer le fichier"
                        className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                    >
                        <FiX aria-hidden />
                    </button>
                </div>
            ) : (
                <label
                    htmlFor="fichier"
                    onDragOver={(e) => {
                        e.preventDefault()
                        setSurvol(true)
                    }}
                    onDragLeave={() => setSurvol(false)}
                    onDrop={(e) => {
                        e.preventDefault()
                        setSurvol(false)
                        choisir(e.dataTransfer.files[0])
                    }}
                    className={`flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition peer-focus-visible:border-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600/20 ${
                        survol ? "border-blue-600 bg-blue-50" : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
                    }`}
                >
                    <FiUploadCloud className="text-3xl text-slate-400" aria-hidden />
                    <span className="mt-2 font-medium text-slate-900">
                        <span className="text-blue-700">Choisis un fichier</span> ou glisse-le ici
                    </span>
                    <span className="mt-1 text-sm text-slate-500">PDF, DOC ou DOCX · 5 Mo maximum</span>
                </label>
            )}

            {erreur && <p role="alert" className="mt-2 text-sm font-medium text-red-700">{erreur}</p>}
        </div>
    )
}
