"use client"

import Link from "next/link";
import { useState, useRef } from "react";
import { useUtilisateur } from "../components/utilisateurContext";
import { appelApi, TYPES_SUJET } from "../lib/api";

const styleChamp = "w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function DeposerExercice() {
    const { utilisateur, chargement } = useUtilisateur();

    const [titre, setTitre] = useState("");
    const [matiere, setMatiere] = useState("");
    const [niveau, setNiveau] = useState("");
    const [type, setType] = useState("");
    const [annee, setAnnee] = useState(String(new Date().getFullYear()));
    const [description, setDescription] = useState("");
    const [fichier, setFichier] = useState<File | null>(null);

    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");
    const [envoiEnCours, setEnvoiEnCours] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setErreur("");

        if (!fichier) {
            setErreur("Choisis le fichier du sujet.");
            return;
        }

        // Un fichier ne peut pas être envoyé en JSON : on utilise FormData
        const donnees = new FormData();
        donnees.append("titre", titre);
        donnees.append("matiere", matiere);
        donnees.append("niveau", niveau);
        donnees.append("type", type);
        donnees.append("annee", annee);
        donnees.append("description", description);
        donnees.append("fichier", fichier);

        setEnvoiEnCours(true);
        try {
            await appelApi("/sujets", { method: "POST", body: donnees });
            setMessage("Sujet déposé avec succès !");

            // Réinitialiser les champs
            setTitre("");
            setMatiere("");
            setNiveau("");
            setType("");
            setDescription("");
            setFichier(null);

            // Réinitialiser l’input fichier
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (e) {
            setErreur((e as Error).message);
        } finally {
            setEnvoiEnCours(false);
        }
    };

    if (chargement) {
        return <p className="min-h-screen text-center text-gray-500 py-12">Chargement...</p>;
    }

    // Le dépôt est réservé aux utilisateurs connectés
    if (!utilisateur) {
        return (
            <div className="min-h-screen px-4 py-12">
            <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Déposer un sujet</h2>
                <p className="text-gray-600 mb-6">Tu dois être connecté pour déposer un sujet.</p>
                <div className="flex flex-wrap justify-center gap-4">
                <Link href="/connexion" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded-md transition duration-300">
                    Se connecter
                </Link>
                <Link href="/inscription" className="border border-blue-700 text-blue-700 hover:bg-blue-100 font-bold py-2 px-5 rounded-md transition duration-300">
                    Créer un compte
                </Link>
                </div>
            </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-12">
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Déposer un sujet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label htmlFor="titre" className="block mb-1 font-medium">Titre du sujet</label>
            <input
                id="titre"
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                maxLength={150}
                placeholder="Exemple : Exercices sur les fractions"
                className={styleChamp}
            />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label htmlFor="matiere" className="block mb-1 font-medium">Matière</label>
                <input
                id="matiere"
                type="text"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                required
                maxLength={60}
                placeholder="Mathématiques, Physique, etc."
                className={styleChamp}
                />
            </div>
            <div>
                <label htmlFor="niveau" className="block mb-1 font-medium">Niveau</label>
                <input
                id="niveau"
                type="text"
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                required
                maxLength={60}
                placeholder="Terminale, Licence 1, etc."
                className={styleChamp}
                />
            </div>
            <div>
                <label htmlFor="type" className="block mb-1 font-medium">Type de sujet</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)} required className={`${styleChamp} capitalize`}>
                <option value="">Choisir un type</option>
                {TYPES_SUJET.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
                </select>
            </div>
            <div>
                <label htmlFor="annee" className="block mb-1 font-medium">Année</label>
                <input
                id="annee"
                type="number"
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                required
                min={1990}
                max={new Date().getFullYear()}
                className={styleChamp}
                />
            </div>
            </div>
            <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description (facultatif)</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={1000}
                placeholder="Décris brièvement le sujet"
                className={styleChamp}
            />
            </div>
            <div>
            <label htmlFor="fichier" className="block mb-1 font-medium">Fichier (PDF, DOC ou DOCX, 10 Mo maximum)</label>
            <input
                id="fichier"
                ref={fileInputRef}
                type="file"
                onChange={(e) => setFichier(e.target.files?.[0] || null)}
                required
                accept=".pdf,.doc,.docx"
                className="w-full"
            />
            </div>
            <button
            type="submit"
            disabled={envoiEnCours}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-md transition duration-300 disabled:opacity-60 cursor-pointer"
            >
            {envoiEnCours ? "Envoi en cours..." : "Déposer"}
            </button>
        </form>

        {message && (
            <p className="mt-4 text-center text-green-600 font-semibold">
            {message} <Link href="/cours" className="underline">Voir les sujets</Link>
            </p>
        )}
        {erreur && (
            <p className="mt-4 text-center text-red-600 font-semibold">{erreur}</p>
        )}
        </div>
        </div>
    );
}
