import Link from "next/link"
import { FiLock } from "react-icons/fi"
import { styleBoutonPrincipal, styleBoutonSecondaire, styleCarte, stylePage } from "./ui"

type AccesReserveProps = {
    titre: string
    texte: string
    // Page vers laquelle revenir une fois connecté
    suite: string
}

// Affiché quand une page demande d'être connecté
export default function AccesReserve({ titre, texte, suite }: AccesReserveProps) {
    const retour = "?suite=" + encodeURIComponent(suite)
    return (
        <div className={stylePage}>
            <div className={`${styleCarte} mx-auto max-w-md p-8 text-center`}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-700">
                    <FiLock aria-hidden />
                </div>
                <h1 className="text-xl font-bold text-slate-900">{titre}</h1>
                <p className="mt-2 text-slate-600">{texte}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href={"/connexion" + retour} className={styleBoutonPrincipal}>
                        Se connecter
                    </Link>
                    <Link href={"/inscription" + retour} className={styleBoutonSecondaire}>
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    )
}
