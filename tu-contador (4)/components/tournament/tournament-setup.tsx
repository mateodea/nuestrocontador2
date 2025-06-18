"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, X, Trophy, Users, Shuffle, Edit, HelpCircle } from "lucide-react"
import { calculateByes, calculateRounds } from "@/utils/tournament"
import { RulesModal } from "@/components/rules-modal"

interface TournamentSetupProps {
  onTournamentStart: (playerNames: string[], isRandomPairing: boolean) => void
  onBack: () => void
}

export function TournamentSetup({ onTournamentStart, onBack }: TournamentSetupProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""])
  const [isRandomPairing, setIsRandomPairing] = useState(true)
  const [showRules, setShowRules] = useState(false)

  const addPlayer = () => {
    if (playerNames.length < 32) {
      setPlayerNames([...playerNames, ""])
    }
  }

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index))
    }
  }

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...playerNames]
    updated[index] = name
    setPlayerNames(updated)
  }

  const fillDefaultNames = () => {
    const filledNames = playerNames.map((name, index) => name.trim() || `Jugador ${index + 1}`)
    setPlayerNames(filledNames)
  }

  const handleStart = () => {
    // Usar nombres predeterminados si están vacíos
    const finalNames = playerNames.map((name, index) => name.trim() || `Jugador ${index + 1}`)
    const validNames = finalNames.filter((name, index) => index < playerNames.length)

    if (validNames.length >= 2) {
      onTournamentStart(validNames, isRandomPairing)
    }
  }

  const validPlayerCount = playerNames.length
  const byeCount = calculateByes(validPlayerCount)
  const roundCount = calculateRounds(validPlayerCount)
  const canStart = validPlayerCount >= 2

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-serif text-[#EFE8C1] ml-4">Crear Torneo</h1>
          <Button
            onClick={() => setShowRules(true)}
            variant="ghost"
            className="text-[#EFE8C1] hover:bg-[#3C4422] ml-auto p-2"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
        </div>

        {/* Tournament Info */}
        <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Trophy className="w-6 h-6 text-[#EFE8C1] mr-2" />
            <h2 className="text-xl font-serif text-[#EFE8C1]">Torneo por Llaves</h2>
          </div>
          <p className="text-[#EFE8C1] text-sm mb-4">
            Los jugadores se enfrentan en duelos eliminatorios. El ganador avanza, el perdedor queda eliminado.
          </p>
          {validPlayerCount >= 2 && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#2D351A] rounded p-3">
                <p className="text-[#EFE8C1] opacity-80">Jugadores</p>
                <p className="text-[#EFE8C1] font-bold">{validPlayerCount}</p>
              </div>
              <div className="bg-[#2D351A] rounded p-3">
                <p className="text-[#EFE8C1] opacity-80">Rondas</p>
                <p className="text-[#EFE8C1] font-bold">{roundCount}</p>
              </div>
              {byeCount > 0 && (
                <>
                  <div className="bg-[#2D351A] rounded p-3">
                    <p className="text-[#EFE8C1] opacity-80">BYEs</p>
                    <p className="text-[#EFE8C1] font-bold">{byeCount}</p>
                  </div>
                  <div className="bg-[#2D351A] rounded p-3">
                    <p className="text-[#EFE8C1] opacity-80">Total Partidos</p>
                    <p className="text-[#EFE8C1] font-bold">{validPlayerCount + byeCount}</p>
                  </div>
                </>
              )}
            </div>
          )}
          {byeCount > 0 && (
            <p className="text-[#EFE8C1] text-xs mt-2 opacity-70">
              * Se agregarán {byeCount} BYEs para completar el cuadro del torneo
            </p>
          )}
        </div>

        {/* Pairing Type Selection */}
        <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-serif text-[#EFE8C1] mb-4">Tipo de Emparejamiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isRandomPairing
                  ? "bg-[#B03A2E] border-[#EFE8C1] text-white"
                  : "bg-[#2D351A] border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422]"
              }`}
              onClick={() => setIsRandomPairing(true)}
            >
              <div className="flex items-center mb-2">
                <Shuffle className="w-5 h-5 mr-2" />
                <span className="font-serif font-bold">Aleatorio</span>
              </div>
              <p className="text-sm opacity-90">Los enfrentamientos se sortean al azar</p>
            </div>

            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                !isRandomPairing
                  ? "bg-[#B03A2E] border-[#EFE8C1] text-white"
                  : "bg-[#2D351A] border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422]"
              }`}
              onClick={() => setIsRandomPairing(false)}
            >
              <div className="flex items-center mb-2">
                <Edit className="w-5 h-5 mr-2" />
                <span className="font-serif font-bold">Manual</span>
              </div>
              <p className="text-sm opacity-90">El organizador elige los enfrentamientos</p>
            </div>
          </div>
        </div>

        {/* Player Setup */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-[#EFE8C1] mr-2" />
              <h3 className="text-lg font-serif text-[#EFE8C1]">Jugadores</h3>
            </div>
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
                  placeholder={`Jugador ${index + 1}`}
                  className="flex-1 bg-white border-[#4C3B2C] text-[#4C3B2C] font-serif"
                />
                {playerNames.length > 2 && (
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
        {playerNames.length < 32 && (
          <Button
            onClick={addPlayer}
            className="w-full mb-6 bg-[#3C4422] border-2 border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#4C5532] py-3 font-serif"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Jugador
          </Button>
        )}

        {/* Start Tournament Button */}
        <Button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full bg-[#B03A2E] hover:bg-[#8B2E23] text-white py-4 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trophy className="w-5 h-5 mr-2" />
          Iniciar Torneo
        </Button>

        {/* Info */}
        <p className="text-[#EFE8C1] text-center mt-4 text-sm opacity-80">
          Mínimo 2 jugadores, máximo 32. Los nombres vacíos se rellenarán automáticamente.
        </p>
      </div>

      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} gameType="tournament" />
    </div>
  )
}
