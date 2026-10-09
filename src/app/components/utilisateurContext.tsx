"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { appelApi, UtilisateurType } from "../lib/api"

type ContexteType = {
    utilisateur: UtilisateurType | null
    chargement: boolean
    setUtilisateur: (utilisateur: UtilisateurType | null) => void
}

const UtilisateurContext = createContext<ContexteType>({
    utilisateur: null,
    chargement: true,
    setUtilisateur: () => {},
})

// Rend l'utilisateur connecté disponible dans toutes les pages
export function UtilisateurProvider({ children }: { children: React.ReactNode }) {
    const [utilisateur, setUtilisateur] = useState<UtilisateurType | null>(null)
    const [chargement, setChargement] = useState(true)

    // Au chargement du site, on demande au backend si une session est ouverte
    useEffect(() => {
        appelApi("/auth/moi")
            .then((donnees) => setUtilisateur(donnees.utilisateur))
            .catch(() => setUtilisateur(null))
            .finally(() => setChargement(false))
    }, [])

    return (
        <UtilisateurContext.Provider value={{ utilisateur, chargement, setUtilisateur }}>
            {children}
        </UtilisateurContext.Provider>
    )
}

export function useUtilisateur() {
    return useContext(UtilisateurContext)
}
