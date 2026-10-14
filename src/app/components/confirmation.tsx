"use client"

import { useEffect, useRef } from "react"
import { styleBoutonDanger, styleBoutonSecondaire } from "./ui"

type ConfirmationProps = {
    ouverte: boolean
    titre: string
    texte: string
    libelleConfirmer: string
    enCours?: boolean
    onConfirmer: () => void
    onAnnuler: () => void
}

// Fenêtre de confirmation avant une action définitive.
// La balise <dialog> gère seule la touche Échap et garde le clavier dans la fenêtre.
export default function Confirmation({ ouverte, titre, texte, libelleConfirmer, enCours, onConfirmer, onAnnuler }: ConfirmationProps) {
    const dialogue = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const element = dialogue.current
        if (!element) return
        if (ouverte && !element.open) element.showModal()
        if (!ouverte && element.open) element.close()
    }, [ouverte])

    return (
        <dialog
            ref={dialogue}
            onClose={onAnnuler}
            // Un clic sur le fond sombre (en dehors du contenu) ferme la fenêtre
            onClick={(e) => {
                if (e.target === dialogue.current) onAnnuler()
            }}
            className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-0 shadow-xl backdrop:bg-slate-900/50"
        >
            <div className="p-6">
                <h2 className="text-lg font-semibold text-slate-900">{titre}</h2>
                <p className="mt-2 break-words text-slate-600">{texte}</p>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onAnnuler} disabled={enCours} className={styleBoutonSecondaire}>
                        Annuler
                    </button>
                    <button type="button" onClick={onConfirmer} disabled={enCours} className={styleBoutonDanger}>
                        {enCours ? "Suppression..." : libelleConfirmer}
                    </button>
                </div>
            </div>
        </dialog>
    )
}
