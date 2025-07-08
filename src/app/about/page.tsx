import Image from "next/image"
export default function About (){
    return (
        <section
            className="bg-white px-4 py-12 md:px-[5%] w-full flex flex-col mb-10.5"
            >
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0A0F1C] mb-10">
                Pourquoi EduPlus ?
            </h1>

            <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-stretch">
                {/* Carte 1 */}
                <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                    src="https://img.icons8.com/ios-filled/100/open-book--v2.png"
                    alt="Livre ouvert"
                    className="w-16 h-16 mb-4"
                />
                <h2 className="text-lg md:text-xl font-semibold text-[#0A0F1C] mb-2">
                    Accès gratuit à des ressources de qualité
                </h2>
                <p className="text-gray-600 text-base">
                    Télécharge gratuitement des cours, fiches et exercices. Toutes les ressources sont vérifiées et organisées.
                </p>
                </div>

                {/* Carte 2 */}
                <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                    src="https://img.icons8.com/ios-filled/100/brain.png"
                    alt="Cerveau"
                    className="w-16 h-16 mb-4"
                />
                <h2 className="text-lg md:text-xl font-semibold text-[#0A0F1C] mb-2">
                    Apprentissage à son rythme
                </h2>
                <p className="text-gray-600 text-base">
                    Revois les notions à tout moment, selon ton emploi du temps et progresse sans pression.
                </p>
                </div>

                {/* Carte 3 */}
                <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                    src="https://img.icons8.com/ios-filled/100/conference-call.png"
                    alt="Partage"
                    className="w-16 h-16 mb-4"
                />
                <h2 className="text-lg md:text-xl font-semibold text-[#0A0F1C] mb-2">
                    Partage entre élèves et étudiants
                </h2>
                <p className="text-gray-600 text-base">
                    Dépose tes documents pour aider les autres et créer une vraie communauté d'entraide.
                </p>
                </div>
            </div>
        </section>

    )
}