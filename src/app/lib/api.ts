// Adresse du backend (modifiable avec NEXT_PUBLIC_API_URL dans un fichier .env.local)
export const URL_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"

export const TYPES_SUJET = ["devoir", "exercice", "examen", "interrogation", "concours", "autre"]

export type UtilisateurType = {
    id: number
    nom: string
    prenom: string
    email: string
    role: string
    niveau: string | null
    etablissement: string | null
    dateCreation: string
}

export type SujetType = {
    id: number
    titre: string
    description: string | null
    type: string
    annee: number
    telechargements: number
    dateCreation: string
    matiere: string
    niveau: string
    utilisateur: { id: number; prenom: string; nom: string }
}

// Appeler le backend. En cas de problème, lance une erreur avec un message à afficher à l'utilisateur
export async function appelApi(chemin: string, options: RequestInit = {}) {
    let reponse: Response
    try {
        // credentials: "include" envoie le cookie de session avec chaque requête
        reponse = await fetch(URL_API + chemin, { ...options, credentials: "include" })
    } catch {
        throw new Error("Impossible de contacter le serveur. Vérifie ta connexion et réessaie.")
    }

    const donnees = await reponse.json().catch(() => null)
    if (!reponse.ok) {
        throw new Error(donnees?.message || "Une erreur est survenue.")
    }
    return donnees
}

// Envoyer des données en JSON (inscription, connexion...)
export function envoyerJson(chemin: string, donnees: object) {
    return appelApi(chemin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
    })
}
