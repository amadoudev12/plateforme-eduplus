export default function Footer() {
    return (
        <footer className="bg-blue-900 text-gray-200 py-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo & slogan */}
            <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">EduPlus</h2>
            <p className="text-sm max-w-xs">
                Apprends, Dépose, Télécharge Gratuitement — La plateforme éducative pour tous les niveaux.
            </p>
            </div>

            {/* Liens utiles */}
            <div className="flex gap-10">
            <div>
                <h3 className="font-semibold mb-3">Liens</h3>
                <ul className="space-y-1 text-sm">
                <li><a href="/home" className="hover:text-white transition">Accueil</a></li>
                <li><a href="/about" className="hover:text-white transition">À propos</a></li>
                <li><a href="/cours" className="hover:text-white transition">Cours</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold mb-3">Contact</h3>
                <ul className="space-y-1 text-sm">
                <li>Email : <a href="https://mail.google.com/mail/u/0/?pli=1#inbox" className="hover:text-white transition">contact@eduplus.com</a></li>
                <li>Téléphone : <a href="https://wa.me/qr/M72OP2Y5H5VZD1" className="hover:text-white transition">+225 00 00 00 00</a></li>
                </ul>
            </div>
            </div>
        </div>
        <div className="mt-10 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} EduPlus. Tous droits réservés.
        </div>
        </footer>
    )
}
