import Link from "next/link"
import { FiBookOpen, FiClock, FiUsers } from "react-icons/fi"
import { styleBoutonPrincipal, styleBoutonSecondaire, styleCarte, stylePage } from "../components/ui"

const raisons = [
    {
        icone: FiBookOpen,
        titre: "Des sujets en accès gratuit",
        texte: "Consulte et télécharge des partiels, examens et TD sans payer et sans créer de compte.",
    },
    {
        icone: FiClock,
        titre: "Des révisions à ton rythme",
        texte: "Entraîne-toi sur les sujets des années passées quand tu veux, pour arriver préparé le jour de l'épreuve.",
    },
    {
        icone: FiUsers,
        titre: "L'entraide entre étudiants",
        texte: "Chaque sujet est déposé par un étudiant. En partageant les tiens, tu aides ceux qui suivent.",
    },
]

export default function About() {
    return (
        <div className={stylePage}>
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Pourquoi EduPlus ?</h1>
                <p className="mt-3 text-lg text-slate-600">
                    Les anciens sujets sont la meilleure façon de réviser, mais ils circulent mal.
                    EduPlus les rassemble au même endroit, pour tout le monde.
                </p>
            </div>

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
                {raisons.map((raison) => (
                    <li key={raison.titre} className={`${styleCarte} p-6`}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700">
                            <raison.icone aria-hidden />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-slate-900">{raison.titre}</h2>
                        <p className="mt-1 text-slate-600">{raison.texte}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/cours" className={styleBoutonPrincipal}>Voir les sujets</Link>
                <Link href="/depot" className={styleBoutonSecondaire}>Déposer un sujet</Link>
            </div>
        </div>
    )
}
