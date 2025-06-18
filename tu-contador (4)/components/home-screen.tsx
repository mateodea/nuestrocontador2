"use client"

import { Button } from "@/components/ui/button"
import { Play, Settings, Trophy, Target } from "lucide-react"

interface HomeScreenProps {
  onStartGame: () => void
  onOpenSettings: () => void
  onCreateTournament: () => void
}

export function HomeScreen({ onStartGame, onOpenSettings, onCreateTournament }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* Logo Area */}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-[#EFE8C1] mb-4 font-serif tracking-wider">NUESTRO CONTADOR</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#B03A2E] via-[#2C82C9] to-[#B03A2E] mx-auto rounded-full"></div>
      </div>

      {/* Intro Text */}
      <p className="text-[#EFE8C1] text-xl font-serif mb-8 max-w-md leading-relaxed">
        Lleva la puntuación de tus juegos de mesa y cartas favoritos.
      </p>

      {/* Target Icon */}
      <div className="mb-12">
        <Target className="w-16 h-16 text-[#EFE8C1] mx-auto" />
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 w-full max-w-sm">
        <Button
          onClick={onStartGame}
          className="w-full bg-[#2D351A] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] transition-all duration-200 py-4 px-6 rounded-xl font-serif text-lg shadow-lg hover:shadow-xl"
        >
          <Play className="w-5 h-5 mr-3" />
          Iniciar Partida
        </Button>

        <Button
          onClick={onOpenSettings}
          className="w-full bg-[#2D351A] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] transition-all duration-200 py-4 px-6 rounded-xl font-serif text-lg shadow-lg hover:shadow-xl"
        >
          <Settings className="w-5 h-5 mr-3" />
          Ajustes
        </Button>

        <Button
          onClick={onCreateTournament}
          className="w-full bg-[#2D351A] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] transition-all duration-200 py-4 px-6 rounded-xl font-serif text-lg shadow-lg hover:shadow-xl"
        >
          <Trophy className="w-5 h-5 mr-3" />
          Crear Torneo
        </Button>
      </div>
    </div>
  )
}
