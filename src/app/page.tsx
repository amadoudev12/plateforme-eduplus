
import Image from 'next/image'
import imgGraduation2 from '../../public/image/Copie de graduation.png'
import About from './about/page'
export default function HomePage(){
    return (
            <section
    id="hero"
    className="w-full h-screen p-6 md:p-[5%] relative bg-gradient-to-br from-[#0F172A] to-[#00101f] flex items-center justify-center"
    >
    <div className="w-full max-w-7xl h-full flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Texte */}
        <div className="left text-center md:text-left max-w-xl">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[64px] text-white font-extrabold leading-tight drop-shadow-md">
            Apprends. Dépose. <br className="hidden sm:block" /> Télécharge Gratuitement.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-4 mb-6 leading-relaxed">
            La plateforme éducative moderne pour tous les niveaux scolaires.
        </p>

        <a
            href="#"
            className="inline-block bg-white text-blue-700 font-semibold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
            📚 Voir les fiches
        </a>
        </div>

        {/* Image */}
        <div className="right mb-10 md:mb-0 md:ml-12 flex justify-center">
        <Image
            src={imgGraduation2}
            alt="Illustration éducative"
            className="w-[180px] xs:w-[220px] sm:w-[260px] md:w-[300px] drop-shadow-xl animate-fade-in"
        />
        </div>
    </div>
</section>
        
    )
}