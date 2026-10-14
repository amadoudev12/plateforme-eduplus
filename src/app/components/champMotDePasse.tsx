"use client"

import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { styleChamp } from "./ui"

type ChampMotDePasseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className">

// Champ mot de passe avec un bouton pour afficher ce qu'on tape
export default function ChampMotDePasse(props: ChampMotDePasseProps) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative">
            <input {...props} type={visible ? "text" : "password"} className={`${styleChamp} pr-11`} />
            <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                aria-pressed={visible}
                className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-lg text-slate-500 hover:text-slate-800"
            >
                {visible ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
            </button>
        </div>
    )
}
