"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ChampMotDePasse from "../components/champMotDePasse"
import { Alerte, Champ, styleBoutonPrincipal, styleCarte, styleChamp, styleLien, stylePage } from "../components/ui"
import { useUtilisateur } from "../components/utilisateurContext"
import { envoyerJson, pageApresConnexion } from "../lib/api"

const MOT_DE_PASSE_MIN = 8

export default function Inscription() {
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [niveau, setNiveau] = useState("")
    const [etablissement, setEtablissement] = useState("")

    const [erreur, setErreur] = useState("")
    const [envoiEnCours, setEnvoiEnCours] = useState(false)
    // On transmet « ?suite= » à la page de connexion pour ne pas perdre la page de retour
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
            const donnees = await envoyerJson("/auth/inscription", {
                prenom,
                nom,
                email,
                motDePasse,
                niveau,
                etablissement,
            })
            // Le backend connecte directement le nouvel utilisateur
            setUtilisateur(donnees.utilisateur)
            router.push(pageApresConnexion())
        } catch (e) {
            setErreur((e as Error).message)
            setEnvoiEnCours(false)
        }
    }

    const caracteresManquants = MOT_DE_PASSE_MIN - motDePasse.length

    return (
        <div className={stylePage}>
        <div className="mx-auto max-w-xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Créer un compte</h1>
                <p className="mt-1 text-slate-600">Gratuit, et prêt en moins d&apos;une minute.</p>
            </div>

            <form onSubmit={handleSubmit} className={`${styleCarte} mt-8 space-y-5 p-6 sm:p-8`}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <Champ label="Prénom" pour="prenom">
                        <input
                            id="prenom"
                            type="text"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                            autoComplete="given-name"
                            autoFocus
                            className={styleChamp}
                        />
                    </Champ>
                    <Champ label="Nom" pour="nom">
                        <input
                            id="nom"
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                            autoComplete="family-name"
                            className={styleChamp}
                        />
                    </Champ>
                </div>
                <Champ label="Adresse email" pour="email">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="exemple@mail.com"
                        className={styleChamp}
                    />
                </Champ>
                <Champ
                    label="Mot de passe"
                    pour="motDePasse"
                    aide={
                        motDePasse.length > 0 && caracteresManquants > 0
                            ? `Encore ${caracteresManquants} caractère${caracteresManquants > 1 ? "s" : ""}.`
                            : `${MOT_DE_PASSE_MIN} caractères minimum.`
                    }
                >
                    <ChampMotDePasse
                        id="motDePasse"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        minLength={MOT_DE_PASSE_MIN}
                        autoComplete="new-password"
                    />
                </Champ>
                <div className="grid gap-5 sm:grid-cols-2">
                    <Champ label="Niveau d'études" pour="niveau" facultatif>
                        <input
                            id="niveau"
                            type="text"
                            value={niveau}
                            onChange={(e) => setNiveau(e.target.value)}
                            maxLength={60}
                            placeholder="Licence 1, Master 2..."
                            className={styleChamp}
                        />
                    </Champ>
                    <Champ label="Établissement" pour="etablissement" facultatif>
                        <input
                            id="etablissement"
                            type="text"
                            value={etablissement}
                            onChange={(e) => setEtablissement(e.target.value)}
                            maxLength={100}
                            autoComplete="organization"
                            placeholder="Nom de ton université"
                            className={styleChamp}
                        />
                    </Champ>
                </div>

                {erreur && <Alerte type="erreur">{erreur}</Alerte>}

                <button type="submit" disabled={envoiEnCours} className={`${styleBoutonPrincipal} w-full py-3`}>
                    {envoiEnCours ? "Création du compte..." : "Créer mon compte"}
                </button>
            </form>

            <p className="mt-6 text-center text-slate-600">
                Déjà un compte ?{" "}
                <Link href={"/connexion" + parametres} className={styleLien}>Se connecter</Link>
            </p>
        </div>
        </div>
    )
}
