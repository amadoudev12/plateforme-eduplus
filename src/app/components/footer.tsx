import Link from "next/link"
import { EMAIL_CONTACT } from "../lib/api"

const styleLienPied = "text-slate-300 transition hover:text-white"

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
            {/* Logo & slogan */}
            <div>
                <p className="text-2xl font-extrabold tracking-tight text-white">EduPlus</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                    Les sujets d&apos;examens, de partiels et de TD partagés gratuitement entre étudiants.
                </p>
            </div>

            <nav aria-label="Liens du pied de page">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Navigation</h2>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="/cours" className={styleLienPied}>Tous les sujets</Link></li>
                    <li><Link href="/depot" className={styleLienPied}>Déposer un sujet</Link></li>
                    <li><Link href="/about" className={styleLienPied}>À propos</Link></li>
                    <li><Link href="/contact" className={styleLienPied}>Contact</Link></li>
                </ul>
            </nav>

            <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h2>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><a href={`mailto:${EMAIL_CONTACT}`} className={styleLienPied}>{EMAIL_CONTACT}</a></li>
                    <li><a href="https://wa.me/qr/M72OP2Y5H5VZD1" target="_blank" rel="noopener noreferrer" className={styleLienPied}>WhatsApp</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-slate-800">
            <p className="mx-auto w-full max-w-6xl px-4 py-5 text-xs text-slate-500 sm:px-6">
                &copy; {new Date().getFullYear()} EduPlus. Tous droits réservés.
            </p>
        </div>
        </footer>
    )
}
