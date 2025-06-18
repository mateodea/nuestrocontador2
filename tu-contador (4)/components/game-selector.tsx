"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Spade, Dice1, Heart, Star, Home } from "lucide-react"
import { type GameType, GAMES } from "@/types/game"

interface GameSelectorProps {
  onGameSelect: (game: GameType) => void
  onBack: () => void
}

const gameIcons = {
  truco: Spade,
  chinchon: Heart,
  uno: Dice1,
  chancho: Users,
  escoba: Star,
  casita: Home,
}

const gameDescriptions = {
  truco: "Juego tradicional argentino",
  chinchon: "Se van eliminando al llegar a 100",
  uno: "El clásico juego de cartas",
  chancho: "El que complete C-H-A-N-C-H-O pierde",
  escoba: "Cartas que suman 15",
  casita: "Roba la casita del oponente",
}

export function GameSelector({ onGameSelect, onBack }: GameSelectorProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-serif text-[#EFE8C1] ml-4">Selecciona un juego</h1>
        </div>

        {/* Game Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(GAMES).map(([key, game]) => {
            const Icon = gameIcons[key as GameType]
            return (
              <div
                key={key}
                className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                onClick={() => onGameSelect(key as GameType)}
              >
                <div className="flex items-center space-x-4">
                  <Icon className="w-8 h-8 text-[#EFE8C1]" />
                  <div>
                    <h3 className="text-xl font-serif text-[#EFE8C1] mb-1">{game.name}</h3>
                    <p className="text-[#EFE8C1] opacity-80 text-sm">
                      {game.isTeamGame ? "2 equipos" : `${game.minPlayers}-${game.maxPlayers} jugadores`}
                    </p>
                    <p className="text-[#EFE8C1] opacity-60 text-xs mb-1">{gameDescriptions[key as GameType]}</p>
                    <p className="text-[#EFE8C1] opacity-60 text-xs">Hasta {game.winningScore} puntos</p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Más Juegos - Próximamente */}
          <div className="bg-[#3C4422] opacity-50 border-[#EFE8C1] border-2 rounded-lg p-6 cursor-not-allowed">
            <div className="flex items-center space-x-4">
              <Dice1 className="w-8 h-8 text-[#EFE8C1]" />
              <div>
                <h3 className="text-xl font-serif text-[#EFE8C1] mb-1">Más Juegos</h3>
                <p className="text-[#EFE8C1] opacity-80 text-sm">Variedad de opciones</p>
                <p className="text-[#EFE8C1] opacity-60 text-xs mb-1">Brisca, Mus, y más</p>
                <p className="text-[#EFE8C1] opacity-60 text-xs">Próximamente...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
