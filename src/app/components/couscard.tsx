    type CoursType = {
    id:number,
    name: string
    matiere: string
    description: string
    date: string
    filiere: string
    }

export default function CoursCard({ cour }: { cour: CoursType }) {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 my-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{cour.name}</h2>
        <p className="text-sm text-gray-500 mb-2">Matière : {cour.matiere}</p>
        <p className="text-gray-700 mb-2">{cour.description}</p>
        <p className="text-sm text-gray-400">Date : {cour.date}</p>
        <p className="text-sm text-gray-400 mb-4">Filière : {cour.filiere}</p>

        <div className="w-full flex justify-center items-center gap-4 mt-4">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            Voir
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            Télécharger
            </button>
        </div>
        </div>
    )
}
