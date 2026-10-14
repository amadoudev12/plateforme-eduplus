"use client"

import { useState } from "react"
import { FiMail } from "react-icons/fi"
import { Alerte, Champ, styleBoutonPrincipal, styleCarte, styleChamp, styleLien, stylePage } from "../components/ui"
import { EMAIL_CONTACT } from "../lib/api"

export default function Contact() {
    const [nom, setNom] = useState("")
    const [message, setMessage] = useState("")
    const [ouvert, setOuvert] = useState(false)

    // Le site n'envoie pas d'email lui-même : on ouvre la messagerie de l'utilisateur avec le message déjà rédigé
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const sujet = encodeURIComponent(`Message de ${nom} depuis EduPlus`)
        const corps = encodeURIComponent(message)
        window.location.href = `mailto:${EMAIL_CONTACT}?subject=${sujet}&body=${corps}`
        setOuvert(true)
    }

    return (
        <div className={stylePage}>
        <div className="mx-auto max-w-xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contacte-nous</h1>
                <p className="mt-1 text-slate-600">Une question, une suggestion ou un sujet à signaler ? Écris-nous.</p>
            </div>

            <form onSubmit={handleSubmit} className={`${styleCarte} mt-8 space-y-5 p-6 sm:p-8`}>
                <Champ label="Ton nom" pour="nom">
                    <input
                        id="nom"
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        autoComplete="name"
                        className={styleChamp}
                    />
                </Champ>
                <Champ label="Message" pour="message">
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        placeholder="Ton message..."
                        className={styleChamp}
                    />
                </Champ>

                {ouvert && (
                    <Alerte type="succes">
                        Ta messagerie s&apos;est ouverte avec le message prêt à envoyer. Si rien ne s&apos;est passé, écris
                        directement à {EMAIL_CONTACT}.
                    </Alerte>
                )}

                <button type="submit" className={`${styleBoutonPrincipal} w-full py-3`}>
                    <FiMail aria-hidden /> Ouvrir ma messagerie
                </button>
                <p className="text-center text-sm text-slate-500">
                    Le message sera envoyé depuis ta propre adresse email.
                </p>
            </form>

            <p className="mt-6 text-center text-slate-600">
                Tu préfères écrire directement ?{" "}
                <a href={`mailto:${EMAIL_CONTACT}`} className={styleLien}>{EMAIL_CONTACT}</a>
            </p>
        </div>
        </div>
    )
}
