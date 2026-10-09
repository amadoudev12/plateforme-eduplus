import { SujetType, URL_API } from "../lib/api"

type CoursCardProps = {
    sujet: SujetType
    // Si cette fonction est fournie, un bouton « Supprimer » est affiché (page profil)
    onSupprimer?: (sujet: SujetType) => void
}

export default function CoursCard({ sujet, onSupprimer }: CoursCardProps) {
    const date = new Date(sujet.dateCreation).toLocaleDateString("fr-FR")

    return (
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col">
        <span className="self-start text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-1 rounded-md mb-3">
            {sujet.type}
        </span>
        <h2 className="text-2xl font-bold text-blue-700 mb-2 break-words">{sujet.titre}</h2>
        <p className="text-sm text-gray-500 mb-2 break-words">
            Matière : {sujet.matiere} · Niveau : {sujet.niveau} · Année : {sujet.annee}
        </p>
        {sujet.description && <p className="text-gray-700 mb-2 break-words">{sujet.description}</p>}
        <p className="text-sm text-gray-400">
            Publié le {date} par {sujet.utilisateur.prenom} {sujet.utilisateur.nom}
        </p>
        <p className="text-sm text-gray-400 mb-4">Téléchargements : {sujet.telechargements}</p>

        <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-auto pt-4">
            <a
            href={`${URL_API}/sujets/${sujet.id}/fichier`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
            Voir
            </a>
            <a
            href={`${URL_API}/sujets/${sujet.id}/telecharger`}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
            Télécharger
            </a>
            {onSupprimer && (
            <button
                onClick={() => onSupprimer(sujet)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
            >
                Supprimer
            </button>
            )}
        </div>
        </div>
    )
}
