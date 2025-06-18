"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, X, Play, HelpCircle } from "lucide-react"
import { type GameType, type Player, GAMES } from "@/types/game"
import { RulesModal } from "@/components/rules-modal"

interface PlayerSetupProps {
  game: GameType
  onPlayersReady: (players: Player[]) => void
  onBack: () => void
}

export function PlayerSetup({ game, onPlayersReady, onBack }: PlayerSetupProps) {
  const gameConfig = GAMES[game]
  const [playerNames, setPlayerNames] = useState<string[]>(
    gameConfig.isTeamGame ? ["", ""] : Array(gameConfig.minPlayers).fill(""),
  )
  const [showRules, setShowRules] = useState(false)

  const addPlayer = () => {
    if (playerNames.length < gameConfig.maxPlayers) {
      setPlayerNames([...playerNames, ""])
    }
  }

  const removePlayer = (index: number) => {
    if (playerNames.length > gameConfig.minPlayers) {
      setPlayerNames(playerNames.filter((_, i) => i !== index))
    }
  }

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...playerNames]
    updated[index] = name
    setPlayerNames(updated)
  }

  const fillDefaultNames = () => {
    const filledNames = playerNames.map((name, index) => {
      if (name.trim()) return name
      return gameConfig.isTeamGame ? `Equipo ${index + 1}` : `Jugador ${index + 1}`
    })
    setPlayerNames(filledNames)
  }

  const handleStart = () => {
    // Usar nombres predeterminados si están vacíos
    const finalNames = playerNames.map((name, index) => {
      if (name.trim()) return name.trim()
      return gameConfig.isTeamGame ? `Equipo ${index + 1}` : `Jugador ${index + 1}`
    })

    const players: Player[] = finalNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      score: 0,
    }))

    if (players.length >= gameConfig.minPlayers) {
      onPlayersReady(players)
    }
  }

  const canStart = playerNames.length >= gameConfig.minPlayers

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-serif text-[#EFE8C1] ml-4 flex-1">{gameConfig.name}</h1>
          <Button onClick={() => setShowRules(true)} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] p-2">
            <HelpCircle className="w-6 h-6" />
          </Button>
        </div>

        {/* Game Info */}
        <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-4 mb-6">
          <p className="text-[#EFE8C1] font-serif text-center text-sm">
            {game === "chancho" && (
              <>
                <span className="block mb-2">🐷 Juego de las Lentejas 🐷</span>
                <span className="block mb-1">C-H-A-N-C-H-O</span>
                <span className="block">¡El que complete las 7 letras pierde!</span>
              </>
            )}
            {game === "chinchon" && (
              <>
                <span className="block mb-1">Se permiten puntos negativos</span>
                <span className="block">Los jugadores se eliminan al llegar a 100</span>
              </>
            )}
            {game === "escoba" && (
              <>
                <span className="block mb-1">Cartas que suman 15</span>
                <span className="block">Primer jugador en llegar a 15 puntos gana</span>
              </>
            )}
            {game !== "chancho" && game !== "chinchon" && game !== "escoba" && (
              <>
                {gameConfig.isTeamGame ? "Equipos" : "Jugadores"}: {gameConfig.minPlayers} - {gameConfig.maxPlayers}
                <span className="block mt-1">Puntos para ganar: {gameConfig.winningScore}</span>
              </>
            )}
          </p>
        </div>

        {/* Player Inputs */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif text-[#EFE8C1]">{gameConfig.isTeamGame ? "Equipos" : "Jugadores"}</h3>
            <Button
              onClick={fillDefaultNames}
              className="bg-[#2D351A] border border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] text-sm font-serif"
            >
              Llenar Nombres
            </Button>
          </div>

          {playerNames.map((name, index) => (
            <div key={index} className="bg-[#F6F1D3] border-[#4C3B2C] border-2 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Input
                  value={name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  placeholder={gameConfig.isTeamGame ? `Equipo ${index + 1}` : `Jugador ${index + 1}`}
                  className="flex-1 bg-white border-[#4C3B2C] text-[#4C3B2C] font-serif"
                />
                {playerNames.length > gameConfig.minPlayers && (
                  <Button
                    onClick={() => removePlayer(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-100 p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Player Button */}
        {playerNames.length < gameConfig.maxPlayers && (
          <Button
            onClick={addPlayer}
            className="w-full mb-6 bg-[#3C4422] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#4C5532] py-3 font-serif"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar {gameConfig.isTeamGame ? "Equipo" : "Jugador"}
          </Button>
        )}

        {/* Start Button */}
        <Button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full bg-[#B03A2E] hover:bg-[#8B2E23] text-white py-4 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5 mr-2" />
          Comenzar Partida
        </Button>

        {/* Info */}
        <p className="text-[#EFE8C1] text-center mt-4 text-sm opacity-80">
          Los nombres vacíos se rellenarán automáticamente con nombres predeterminados
        </p>
      </div>

      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} gameType={game} />
    </div>
  )
}
