// Le backend est appelé à travers le site lui-même : Next transmet « /api/... » au backend (voir next.config.ts)
export const URL_API = "/api"

export const TYPES_SUJET = ["devoir", "exercice", "examen", "interrogation", "concours", "autre"]

// "examen" devient "Examen" (pour l'affichage)
export function majuscule(texte: string) {
    return texte.charAt(0).toUpperCase() + texte.slice(1)
}

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
    // Identifiant du fichier en ligne : son extension indique le format (pdf, doc, docx)
    fichier: string
    utilisateur: { id: number; prenom: string; nom: string }
}

export const EMAIL_CONTACT = "contact@eduplus.com"

// Page où envoyer l'utilisateur après sa connexion : celle indiquée par « ?suite= » dans l'adresse, sinon les sujets.
// On n'accepte qu'un chemin du site ("/depot"), jamais une adresse externe.
export function pageApresConnexion() {
    const suite = new URLSearchParams(window.location.search).get("suite")
    return suite && suite.startsWith("/") && !suite.startsWith("//") ? suite : "/cours"
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
