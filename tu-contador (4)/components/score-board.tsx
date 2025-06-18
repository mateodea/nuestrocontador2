"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Trophy } from "lucide-react"
import type { GameConfig, Player } from "@/app/page"
import { WinnerModal } from "@/components/winner-modal"

interface ScoreBoardProps {
  gameConfig: GameConfig
  onBack: () => void
  onFinish: () => void
}

export function ScoreBoard({ gameConfig, onBack, onFinish }: ScoreBoardProps) {
  const [players, setPlayers] = useState<Player[]>(gameConfig.players)
  const [winner, setWinner] = useState<Player | null>(null)

  const updateScore = (playerId: string, change: number) => {
    setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, score: Math.max(0, p.score + change) } : p)))
  }

  useEffect(() => {
    if (gameConfig.maxScore) {
      const winningPlayer = players.find((p) => p.score >= gameConfig.maxScore!)
      if (winningPlayer && !winner) {
        setWinner(winningPlayer)
      }
    }
  }, [players, gameConfig.maxScore, winner])

  const handleFinishGame = () => {
    const highestScore = Math.max(...players.map((p) => p.score))
    const winningPlayer = players.find((p) => p.score === highestScore)
    if (winningPlayer) {
      setWinner(winningPlayer)
    }
  }

  const handleWinnerClose = () => {
    setWinner(null)
    onFinish()
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-center">Puntuación</h1>
          <Button onClick={handleFinishGame} className="bg-[#B03A2E] hover:bg-[#8B2E23] text-white font-serif">
            <Trophy className="h-4 w-4 mr-2" />
            Finalizar
          </Button>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {players.map((player) => (
            <Card key={player.id} className="bg-[#F6F1D3] border-2 border-[#4C3B2C] shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#2D351A] mb-4 font-serif">{player.name}</h3>
                <div className="text-5xl font-bold text-[#2D351A] mb-6">{player.score}</div>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => updateScore(player.id, -1)}
                    className="w-12 h-12 rounded-full bg-[#B03A2E] hover:bg-[#8B2E23] text-white"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => updateScore(player.id, 1)}
                    className="w-12 h-12 rounded-full bg-[#3C4422] hover:bg-[#4C5532] text-white"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Info */}
        {gameConfig.maxScore && (
          <Card className="bg-[#3C4422] border-[#EFE8C1]">
            <CardContent className="p-4">
              <p className="text-[#EFE8C1] font-serif text-center">Puntos para ganar: {gameConfig.maxScore}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <WinnerModal winner={winner} isOpen={!!winner} onClose={handleWinnerClose} />
    </div>
  )
}
