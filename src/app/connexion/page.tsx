"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ChampMotDePasse from "../components/champMotDePasse"
import { Alerte, Champ, styleBoutonPrincipal, styleCarte, styleChamp, styleLien, stylePage } from "../components/ui"
import { useUtilisateur } from "../components/utilisateurContext"
import { envoyerJson, pageApresConnexion } from "../lib/api"

export default function Connexion() {
    const [email, setEmail] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [erreur, setErreur] = useState("")
    const [envoiEnCours, setEnvoiEnCours] = useState(false)
    // On transmet « ?suite= » à la page d'inscription pour ne pas perdre la page de retour
    const [parametres, setParametres] = useState("")
    const { setUtilisateur } = useUtilisateur()
    const router = useRouter()

    useEffect(() => {
        setParametres(window.location.search)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErreur("")
        setEnvoiEnCours(true)

        try {
            const donnees = await envoyerJson("/auth/connexion", { email, motDePasse })
            setUtilisateur(donnees.utilisateur)
            router.push(pageApresConnexion())
        } catch (e) {
            setErreur((e as Error).message)
            setEnvoiEnCours(false)
        }
    }

    return (
        <div className={stylePage}>
        <div className="mx-auto max-w-md">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Content de te revoir</h1>
                <p className="mt-1 text-slate-600">Connecte-toi pour déposer et gérer tes sujets.</p>
            </div>

            <form onSubmit={handleSubmit} className={`${styleCarte} mt-8 space-y-5 p-6 sm:p-8`}>
                <Champ label="Adresse email" pour="email">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        autoFocus
                        placeholder="exemple@mail.com"
                        className={styleChamp}
                    />
                </Champ>
                <Champ label="Mot de passe" pour="motDePasse">
                    <ChampMotDePasse
                        id="motDePasse"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </Champ>

                {erreur && <Alerte type="erreur">{erreur}</Alerte>}

                <button type="submit" disabled={envoiEnCours} className={`${styleBoutonPrincipal} w-full py-3`}>
                    {envoiEnCours ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p className="mt-6 text-center text-slate-600">
                Pas encore de compte ?{" "}
                <Link href={"/inscription" + parametres} className={styleLien}>Créer un compte</Link>
            </p>
        </div>
        </div>
    )
}
