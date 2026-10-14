"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import CoursCard from "./couscard"
import { styleLien } from "./ui"
import { appelApi, SujetType } from "../lib/api"

const NOMBRE_AFFICHE = 3

// Les derniers sujets déposés, sur la page d'accueil.
// La section reste masquée s'il n'y a rien à montrer ou si le serveur ne répond pas.
export default function DerniersSujets() {
    const [sujets, setSujets] = useState<SujetType[]>([])

    useEffect(() => {
        appelApi("/sujets")
            .then((resultat: SujetType[]) => setSujets(resultat.slice(0, NOMBRE_AFFICHE)))
            .catch(() => {})
    }, [])

    if (sujets.length === 0) return null

    return (
        <section className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Derniers sujets déposés</h2>
                <Link href="/cours" className={`${styleLien} inline-flex items-center gap-1.5`}>
                    Tout voir <FiArrowRight aria-hidden />
                </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sujets.map((sujet) => (
                    <CoursCard key={sujet.id} sujet={sujet} />
                ))}
            </div>
        </section>
    )
}
