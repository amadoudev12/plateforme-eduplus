"use client"

import { useState, useRef } from "react";

export default function DeposerExercice() {
    const [titre, setTitre] = useState("");
    const [matiere, setMatiere] = useState("");
    const [description, setDescription] = useState("");
    const [fichier, setFichier] = useState(null);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);

    const handleSubmit = (e:any) => {
        e.preventDefault();

        console.log({ titre, matiere, description, fichier });
        setMessage("Exercice déposé localement avec succès !");

        // Réinitialiser les champs
        setTitre("");
        setMatiere("");
        setDescription("");
        setFichier(null);

        // Réinitialiser l’input fichier
        // if (fileInputRef.current) {
        // fileInputRef.current.va;
        // }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Déposer un exercice (local)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label className="block mb-1 font-medium">Titre de l'exercice</label>
            <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                placeholder="Exemple : Exercices sur les fractions"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div>
            <label className="block mb-1 font-medium">Matière</label>
            <input
                type="text"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                required
                placeholder="Mathématiques, Physique, etc."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Décris brièvement l'exercice"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div>
            <label className="block mb-1 font-medium">Fichier (PDF, DOC...)</label>
            <input
                ref={fileInputRef}
                type="file"
                // onChange={(e) => setFichier(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                className="w-full"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-md transition duration-300"
            >
            Déposer
            </button>
        </form>

        {message && (
            <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
        )}
        </div>
    );
}
