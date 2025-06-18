"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus, Square, X } from "lucide-react"
import { type GameType, type Player, GAMES, CHANCHO_LETTERS } from "@/types/game"

interface ScoreboardProps {
  game: GameType
  players: Player[]
  onScoreUpdate: (playerId: string, newScore: number) => void
  onPlayerEliminate: (playerId: string) => void
  onEndGame: () => void
}

export function Scoreboard({ game, players, onScoreUpdate, onPlayerEliminate, onEndGame }: ScoreboardProps) {
  const gameConfig = GAMES[game]

  const updateScore = (playerId: string, change: number) => {
    const player = players.find((p) => p.id === playerId)
    if (player && !player.isEliminated) {
      let newScore = player.score + change

      // Para Chinchón permitir puntos negativos
      if (game === "chinchon") {
        // Sin límite inferior para puntos negativos
      } else {
        // Para otros juegos, no permitir puntos negativos
        newScore = Math.max(0, newScore)
      }

      // Para Chancho, no permitir más de 7 puntos
      if (game === "chancho") {
        newScore = Math.min(7, newScore)
      }

      onScoreUpdate(playerId, newScore)

      // Auto-eliminación en Chinchón
      if (game === "chinchon" && newScore >= gameConfig.winningScore) {
        onPlayerEliminate(playerId)
      }
    }
  }

  const getScoreDisplay = (player: Player) => {
    if (game === "chancho") {
      const letters = []
      for (let i = 1; i <= player.score; i++) {
        letters.push(CHANCHO_LETTERS[i as keyof typeof CHANCHO_LETTERS])
      }
      return letters.join("")
    }
    return player.score.toString()
  }

  const getScoreButtons = (playerId: string, currentScore: number, isEliminated: boolean) => {
    if (isEliminated) {
      return (
        <div className="text-center">
          <p className="text-red-600 font-serif text-sm">❌ Eliminado</p>
        </div>
      )
    }

    if (game === "chinchon") {
      return (
        <div className="grid grid-cols-3 gap-2">
          {/* Botones para restar */}
          <Button
            onClick={() => updateScore(playerId, -10)}
            className="w-full h-10 bg-[#B03A2E] hover:bg-[#8B2E23] text-white text-sm font-serif"
          >
            -10
          </Button>
          <Button
            onClick={() => updateScore(playerId, -5)}
            className="w-full h-10 bg-[#B03A2E] hover:bg-[#8B2E23] text-white text-sm font-serif"
          >
            -5
          </Button>
          <Button
            onClick={() => updateScore(playerId, -1)}
            className="w-full h-10 bg-[#B03A2E] hover:bg-[#8B2E23] text-white text-sm font-serif"
          >
            -1
          </Button>
          {/* Botones para sumar */}
          <Button
            onClick={() => updateScore(playerId, 1)}
            className="w-full h-10 bg-[#3C4422] hover:bg-[#4C5532] text-white text-sm font-serif"
          >
            +1
          </Button>
          <Button
            onClick={() => updateScore(playerId, 5)}
            className="w-full h-10 bg-[#3C4422] hover:bg-[#4C5532] text-white text-sm font-serif"
          >
            +5
          </Button>
          <Button
            onClick={() => updateScore(playerId, 10)}
            className="w-full h-10 bg-[#3C4422] hover:bg-[#4C5532] text-white text-sm font-serif"
          >
            +10
          </Button>
        </div>
      )
    } else {
      // Botones normales para otros juegos
      return (
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => updateScore(playerId, -1)}
            className="w-12 h-12 rounded-full bg-[#B03A2E] hover:bg-[#8B2E23] text-white p-0"
            disabled={(currentScore === 0 && game !== "chinchon") || (game === "escoba" && currentScore === 0)}
          >
            <Minus className="w-6 h-6" />
          </Button>

          <Button
            onClick={() => updateScore(playerId, 1)}
            className="w-12 h-12 rounded-full bg-[#3C4422] hover:bg-[#4C5532] text-white p-0"
            disabled={game === "chancho" && currentScore >= 7}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      )
    }
  }

  const activePlayers = players.filter((p) => !p.isEliminated)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#EFE8C1] mb-2">{gameConfig.name}</h1>
          {game === "chancho" && (
            <p className="text-[#EFE8C1] opacity-80">🐷 El que complete C-H-A-N-C-H-O pierde 🐷</p>
          )}
          {game === "chinchon" && (
            <div>
              <p className="text-[#EFE8C1] opacity-80">Los jugadores se eliminan al llegar a 100 puntos</p>
              <p className="text-[#EFE8C1] opacity-60 text-sm">
                Jugadores activos: {activePlayers.length}/{players.length}
              </p>
            </div>
          )}
          {game === "escoba" && (
            <p className="text-[#EFE8C1] opacity-80">Cartas que suman 15 - Primer jugador en llegar a 15 gana</p>
          )}
          {game !== "chancho" && game !== "chinchon" && game !== "escoba" && (
            <p className="text-[#EFE8C1] opacity-80">
              Primer jugador en llegar a {gameConfig.winningScore} puntos gana
            </p>
          )}
        </div>

        {/* Player Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {players.map((player) => (
            <div
              key={player.id}
              className={`border-[#4C3B2C] border-2 rounded-lg p-6 text-center shadow-lg transition-all ${
                player.isEliminated ? "bg-gray-300 opacity-60" : "bg-[#F6F1D3]"
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-serif text-[#4C3B2C] flex-1">{player.name}</h3>
                {game === "chinchon" && player.isEliminated && <X className="w-6 h-6 text-red-600" />}
              </div>

              <div className="mb-6">
                {game === "chancho" ? (
                  <div>
                    <div className="text-3xl font-bold text-[#4C3B2C] mb-2">{getScoreDisplay(player) || "🐷"}</div>
                    <div className="text-sm text-[#4C3B2C] opacity-70">{player.score}/7 lentejas</div>
                  </div>
                ) : (
                  <div className="text-5xl font-bold text-[#4C3B2C]">{player.score}</div>
                )}
              </div>

              {getScoreButtons(player.id, player.score, !!player.isEliminated)}

              {/* Manual eliminate button for Chinchón */}
              {game === "chinchon" && !player.isEliminated && (
                <Button
                  onClick={() => onPlayerEliminate(player.id)}
                  className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-serif"
                >
                  Eliminar Manualmente
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* End Game Button */}
        <div className="text-center">
          <Button
            onClick={onEndGame}
            className="bg-[#2D351A] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] px-8 py-3 font-serif"
          >
            <Square className="w-5 h-5 mr-2" />
            Finalizar Partida
          </Button>
        </div>
      </div>
    </div>
  )
}
