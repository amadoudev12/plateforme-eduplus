import Image from 'next/image'
import Link from 'next/link'
import { FiDownload, FiSearch, FiUpload } from 'react-icons/fi'
import DerniersSujets from './components/derniersSujets'
import imgGraduation2 from '../../public/image/Copie de graduation.png'

const etapes = [
    {
        icone: FiSearch,
        titre: "Cherche",
        texte: "Filtre par matière, niveau, type et année pour trouver le sujet dont tu as besoin.",
    },
    {
        icone: FiDownload,
        titre: "Télécharge",
        texte: "Consulte le sujet en ligne ou télécharge-le. C'est gratuit, sans inscription.",
    },
    {
        icone: FiUpload,
        titre: "Partage",
        texte: "Dépose tes anciens partiels et TD pour aider les étudiants qui viennent après toi.",
    },
]

export default function HomePage(){
    return (
        <>
        <section id="hero" className="bg-gradient-to-br from-[#0F172A] to-[#00101f]">
            <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:justify-between md:py-24">
                {/* Texte */}
                <div className="max-w-xl text-center md:text-left">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Les sujets d&apos;examens, partagés entre étudiants.
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-slate-300">
                        Partiels, TD, concours : trouve les sujets des années passées pour réviser, et dépose les tiens. Gratuitement.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                        <Link
                            href="/cours"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                        >
                            <FiSearch aria-hidden /> Voir les sujets
                        </Link>
                        <Link
                            href="/depot"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            <FiUpload aria-hidden /> Déposer un sujet
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <Image
                    src={imgGraduation2}
                    alt=""
                    priority
                    className="w-40 drop-shadow-xl sm:w-56 md:w-72"
                />
            </div>
        </section>

        {/* Comment ça marche */}
        <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
                <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Comment ça marche</h2>
                <ol className="mt-10 grid gap-8 md:grid-cols-3">
                    {etapes.map((etape, numero) => (
                        <li key={etape.titre} className="text-center md:text-left">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700 md:mx-0">
                                <etape.icone aria-hidden />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                {numero + 1}. {etape.titre}
                            </h3>
                            <p className="mt-1 text-slate-600">{etape.texte}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        <DerniersSujets />

        {/* Appel à contribuer */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="rounded-2xl bg-blue-700 px-6 py-12 text-center sm:px-12">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Tu as gardé tes anciens sujets ?</h2>
                <p className="mx-auto mt-3 max-w-xl text-blue-100">
                    Un partiel déposé aujourd&apos;hui, c&apos;est une révision plus simple pour la promo suivante.
                </p>
                <Link
                    href="/depot"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                >
                    <FiUpload aria-hidden /> Déposer un sujet
                </Link>
            </div>
        </section>
        </>
    )
}
