export default function Contact() {
    return (
        <div className=" mb-10.5 min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Contactez-nous</h1>
            <p className="text-gray-600 text-center mb-8">
            Une question ? Une suggestion ? Écrivez-nous, nous vous répondrons dans les plus brefs délais.
            </p>

            <form className="space-y-6">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Nom complet</label>
                <input
                id="name"
                type="text"
                placeholder="Votre nom"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Adresse email</label>
                <input
                id="email"
                type="email"
                placeholder="exemple@mail.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                <textarea
                id="message"
                rows={5}
                placeholder="Votre message ici..."
                className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition duration-300"
            >
                Envoyer le message
            </button>
            </form>
        </div>
        </div>
    )
}
