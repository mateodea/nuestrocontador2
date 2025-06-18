"use client"

import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, Home, Frown } from "lucide-react"
import type { Player } from "@/types/game"

interface WinnerModalProps {
  winner: Player
  onNewGame: () => void
  onRestart: () => void
  isLosingGame?: boolean
}

export function WinnerModal({ winner, onNewGame, onRestart, isLosingGame = false }: WinnerModalProps) {
  // Add null check to prevent errors
  if (!winner) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div
        className={`${isLosingGame ? "bg-gradient-to-br from-red-400 to-red-600 border-red-700" : "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-700"} border-4 rounded-lg max-w-md w-full shadow-2xl p-8 text-center relative`}
      >
        {/* Confetti Effect for winners, sad effect for losers */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {!isLosingGame ? (
            <>
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
              <div
                className="absolute top-0 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute top-1/4 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </>
          ) : (
            <>
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
              <div
                className="absolute top-0 right-1/4 w-2 h-2 bg-gray-600 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </>
          )}
        </div>

        <div className="relative z-10">
          {isLosingGame ? (
            <Frown className="w-16 h-16 text-red-800 mx-auto mb-4" />
          ) : (
            <Trophy className="w-16 h-16 text-yellow-800 mx-auto mb-4" />
          )}

          <h2 className={`text-3xl font-serif font-bold mb-2 ${isLosingGame ? "text-red-900" : "text-yellow-900"}`}>
            {isLosingGame ? "¡Perdió!" : "¡Ganó!"}
          </h2>

          <p className={`text-2xl font-serif mb-6 ${isLosingGame ? "text-red-800" : "text-yellow-800"}`}>
            {winner.name}
          </p>

          <p className={`text-lg mb-8 ${isLosingGame ? "text-red-800" : "text-yellow-800"}`}>
            {isLosingGame ? "Completó C-H-A-N-C-H-O" : `Con ${winner.score} puntos`}
          </p>

          <div className="space-y-3">
            <Button onClick={onRestart} className="w-full bg-[#3C4422] hover:bg-[#4C5532] text-white py-3 font-serif">
              <RotateCcw className="w-5 h-5 mr-2" />
              Jugar de Nuevo
            </Button>

            <Button onClick={onNewGame} className="w-full bg-[#B03A2E] hover:bg-[#8B2E23] text-white py-3 font-serif">
              <Home className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
