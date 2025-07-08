import CoursCard from "../../app/components/couscard" // adapte le chemin si besoin

type CoursType = {
    id: number
    name: string
    matiere: string
    description: string
    date: string
    filiere: string
}

const cours: CoursType[] = [
    {
        id: 1,
        name: "Algèbre linéaire",
        matiere: "Mathématiques",
        description: "Étude des matrices, systèmes d'équations linéaires.",
        date: "2025-07-01",
        filiere: "Sciences",
    },
    {
        id: 2,
        name: "Thermodynamique",
        matiere: "Physique",
        description: "Introduction aux lois de la thermodynamique.",
        date: "2025-07-02",
        filiere: "Sciences",
    },
    {
        id: 3,
        name: "Analyse littéraire",
        matiere: "Français",
        description: "Étude des textes classiques en profondeur.",
        date: "2025-07-03",
        filiere: "Lettres",
    }
  // ajoute d'autres cours ici
]

export default function ListeDesCours() {
    return (
        <div className="p-6 mb-12.5">
        <h1 className="text-2xl font-bold text-center mb-6">Tous les cours disponibles</h1>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-stretch">
            {cours.map((cour) => (
                <CoursCard key={cour.id} cour={cour} />
            ))}
        </div>
        </div>
    )
}

