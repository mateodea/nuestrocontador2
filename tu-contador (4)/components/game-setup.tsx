"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, X, Play } from "lucide-react"
import type { GameType, GameConfig, Player } from "@/app/page"

interface GameSetupProps {
  gameType: GameType
  onGameStart: (config: GameConfig) => void
  onBack: () => void
}

const gameRules = {
  truco: { minPlayers: 2, maxPlayers: 2, isTeamGame: true, maxScore: 30 },
  chinchon: { minPlayers: 2, maxPlayers: 8, isTeamGame: false, maxScore: 100 },
  chancho: { minPlayers: 2, maxPlayers: 10, isTeamGame: false },
  uno: { minPlayers: 2, maxPlayers: 10, isTeamGame: false, maxScore: 500 },
}

const gameNames = {
  truco: "Truco",
  chinchon: "Chinchón",
  chancho: "Chancho",
  uno: "UNO",
}

export function GameSetup({ gameType, onGameStart, onBack }: GameSetupProps) {
  const rules = gameRules[gameType]
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: rules.isTeamGame ? "Equipo 1" : "", score: 0 },
    { id: "2", name: rules.isTeamGame ? "Equipo 2" : "", score: 0 },
  ])

  const addPlayer = () => {
    if (players.length < rules.maxPlayers) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: "",
        score: 0,
      }
      setPlayers([...players, newPlayer])
    }
  }

  const removePlayer = (id: string) => {
    if (players.length > rules.minPlayers) {
      setPlayers(players.filter((p) => p.id !== id))
    }
  }

  const updatePlayerName = (id: string, name: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const canStart = players.every((p) => p.name.trim() !== "") && players.length >= rules.minPlayers

  const handleStart = () => {
    if (canStart) {
      const config: GameConfig = {
        type: gameType,
        players: players.map((p) => ({ ...p, name: p.name.trim() })),
        maxScore: rules.maxScore,
      }
      onGameStart(config)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-center flex-1">
            Configurar {gameNames[gameType]}
          </h1>
        </div>

        {/* Player Setup */}
        <div className="space-y-4 mb-8">
          {players.map((player, index) => (
            <Card key={player.id} className="bg-[#F6F1D3] border-[#4C3B2C]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayerName(player.id, e.target.value)}
                      placeholder={rules.isTeamGame ? `Equipo ${index + 1}` : `Jugador ${index + 1}`}
                      className="bg-white border-[#4C3B2C] text-[#2D351A] font-serif"
                    />
                  </div>
                  {players.length > rules.minPlayers && (
                    <Button
                      onClick={() => removePlayer(player.id)}
                      variant="ghost"
                      size="sm"
                      className="text-[#B03A2E] hover:bg-[#B03A2E]/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Player Button */}
        {players.length < rules.maxPlayers && (
          <Button
            onClick={addPlayer}
            className="w-full mb-8 bg-[#3C4422] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#4C5532] font-serif"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar {rules.isTeamGame ? "Equipo" : "Jugador"}
          </Button>
        )}

        {/* Game Info */}
        <Card className="bg-[#3C4422] border-[#EFE8C1] mb-8">
          <CardContent className="p-4">
            <p className="text-[#EFE8C1] font-serif text-center">
              {rules.isTeamGame ? "Equipos" : "Jugadores"}: {rules.minPlayers} - {rules.maxPlayers}
              {rules.maxScore && <span className="block mt-1">Puntos para ganar: {rules.maxScore}</span>}
            </p>
          </CardContent>
        </Card>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full bg-[#2D351A] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg font-serif"
        >
          <Play className="mr-2 h-5 w-5" />
          Comenzar partida
        </Button>
      </div>
    </div>
  )
}
