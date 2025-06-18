"use client"

import { Button } from "@/components/ui/button"
import { X, Spade, Heart, Dice1, Users, Star, Trophy, Home } from "lucide-react"
import type { GameType } from "@/types/game"

interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
  gameType?: GameType | "tournament"
}

const gameIcons = {
  truco: Spade,
  chinchon: Heart,
  uno: Dice1,
  chancho: Users,
  escoba: Star,
  casita: Home,
  tournament: Trophy,
}

export function RulesModal({ isOpen, onClose, gameType }: RulesModalProps) {
  if (!isOpen) return null

  const getGameRules = () => {
    switch (gameType) {
      case "truco":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Spade className="w-6 h-6 mr-2 text-[#B03A2E]" />
              Truco
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Jugadores:</strong> 2 equipos
              </p>
              <p>
                <strong>Objetivo:</strong> Llegar a 30 puntos
              </p>
              <p>
                <strong>Cartas:</strong> Se usan 40 cartas españolas (sin 8, 9 y comodines)
              </p>
              <p>
                <strong>Puntuación:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Envido:</strong> 2 puntos
                </li>
                <li>
                  <strong>Real Envido:</strong> 3 puntos
                </li>
                <li>
                  <strong>Falta Envido:</strong> Todos los puntos que falten para ganar
                </li>
                <li>
                  <strong>Truco:</strong> 2 puntos
                </li>
                <li>
                  <strong>Re Truco:</strong> 3 puntos
                </li>
                <li>
                  <strong>Vale Cuatro:</strong> 4 puntos
                </li>
              </ul>
              <p>
                <strong>Flor:</strong> Si se juega con flor, vale 3 puntos (6 si hay contraflor)
              </p>
              <p>
                <strong>Cómo jugar:</strong> Se reparten 3 cartas a cada jugador. Se juega al mejor de 3 manos por
                ronda.
              </p>
            </div>
          </div>
        )

      case "chinchon":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-[#B03A2E]" />
              Chinchón
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Jugadores:</strong> 2 a 8 jugadores
              </p>
              <p>
                <strong>Objetivo:</strong> Ser el último jugador en quedar en juego
              </p>
              <p>
                <strong>Cartas:</strong> Baraja española de 40 cartas (o 50 cartas incluyendo 8 y 9)
              </p>
              <p>
                <strong>Eliminación:</strong> Al llegar a 100 puntos, el jugador queda eliminado
              </p>
              <p>
                <strong>Puntuación:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Se suman los puntos de las cartas que no forman jugadas</li>
                <li>Se pueden tener puntos negativos</li>
                <li>
                  <strong>Chinchón:</strong> -10 puntos (todas las cartas en jugadas)
                </li>
                <li>
                  <strong>Corte:</strong> Se resta el valor de la carta cortada
                </li>
              </ul>
              <p>
                <strong>Jugadas válidas:</strong> Escaleras del mismo palo y piernas (3+ cartas iguales)
              </p>
              <p>
                <strong>Cómo jugar:</strong> Se reparten 7 cartas a cada jugador. En cada turno se toma una carta y se
                descarta otra.
              </p>
            </div>
          </div>
        )

      case "uno":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Dice1 className="w-6 h-6 mr-2 text-[#B03A2E]" />
              UNO
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Jugadores:</strong> 2 a 10 jugadores
              </p>
              <p>
                <strong>Objetivo:</strong> Llegar a 500 puntos
              </p>
              <p>
                <strong>Puntuación:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Cartas numéricas:</strong> Su valor
                </li>
                <li>
                  <strong>Saltar, Reversa, +2:</strong> 20 puntos
                </li>
                <li>
                  <strong>Comodín, +4:</strong> 50 puntos
                </li>
              </ul>
              <p>
                <strong>Cómo ganar puntos:</strong> Cuando un jugador se queda sin cartas, suma los puntos de las cartas
                restantes de los otros jugadores
              </p>
              <p>
                <strong>Regla especial:</strong> Si no dices "UNO" al quedarte con una carta, tomas 2 cartas de castigo
              </p>
            </div>
          </div>
        )

      case "chancho":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Users className="w-6 h-6 mr-2 text-[#B03A2E]" />
              Chancho
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Jugadores:</strong> 2 a 10 jugadores
              </p>
              <p>
                <strong>Objetivo:</strong> NO ser el primero en completar la palabra C-H-A-N-C-H-O
              </p>
              <p>
                <strong>Cómo se juega:</strong> Cada jugador intenta conseguir 4 cartas del mismo número. El que no lo
                logra recibe una letra.
              </p>
              <p>
                <strong>Sistema de letras:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>1 falta:</strong> C
                </li>
                <li>
                  <strong>2 faltas:</strong> H
                </li>
                <li>
                  <strong>3 faltas:</strong> A
                </li>
                <li>
                  <strong>4 faltas:</strong> N
                </li>
                <li>
                  <strong>5 faltas:</strong> C
                </li>
                <li>
                  <strong>6 faltas:</strong> H
                </li>
                <li>
                  <strong>7 faltas:</strong> O (PERDEDOR)
                </li>
              </ul>
              <p>
                <strong>Perdedor:</strong> El primer jugador en completar C-H-A-N-C-H-O pierde la partida
              </p>
              <p>
                <strong>Cartas:</strong> Se usan tantos grupos de 4 cartas iguales como jugadores haya
              </p>
            </div>
          </div>
        )

      case "escoba":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Star className="w-6 h-6 mr-2 text-[#B03A2E]" />
              Escoba de 15
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Jugadores:</strong> 2 a 4 jugadores
              </p>
              <p>
                <strong>Objetivo:</strong> Llegar a 15 puntos
              </p>
              <p>
                <strong>Cartas:</strong> Baraja española de 40 cartas
              </p>
              <p>
                <strong>Puntuación:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Escoba:</strong> 1 punto (levantar todas las cartas de la mesa)
                </li>
                <li>
                  <strong>Cartas:</strong> 1 punto (tener más de 20 cartas)
                </li>
                <li>
                  <strong>Oros:</strong> 1 punto (tener más cartas de oro)
                </li>
                <li>
                  <strong>Siete Bello:</strong> 1 punto (tener el 7 de oros)
                </li>
                <li>
                  <strong>Sietes:</strong> 1 punto (tener más sietes)
                </li>
              </ul>
              <p>
                <strong>Cómo jugar:</strong> Se reparten 3 cartas a cada jugador y se ponen 4 en la mesa. Hay que sumar
                15 con las cartas de la mesa
              </p>
            </div>
          </div>
        )

      case "casita":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Home className="w-6 h-6 mr-2 text-[#B03A2E]" />
              Casita Robada
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Jugadores:</strong> 2 a 6 jugadores
              </p>
              <p>
                <strong>Objetivo:</strong> Llegar a 100 puntos
              </p>
              <p>
                <strong>Cartas:</strong> Baraja española de 40 cartas
              </p>
              <p>
                <strong>Puntuación:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Casita:</strong> 10 puntos (4 cartas del mismo palo)
                </li>
                <li>
                  <strong>Casita Robada:</strong> 20 puntos (robar la casita del oponente)
                </li>
                <li>
                  <strong>Escalera:</strong> 5 puntos (3+ cartas consecutivas del mismo palo)
                </li>
                <li>
                  <strong>Pierna:</strong> 3 puntos (3+ cartas del mismo número)
                </li>
              </ul>
              <p>
                <strong>Cómo jugar:</strong> Se reparten 4 cartas a cada jugador. En cada turno se toma una carta y se
                descarta otra.
              </p>
              <p>
                <strong>Robo:</strong> Si un jugador descarta una carta que completa tu casita, puedes robarla y ganar
                20 puntos
              </p>
            </div>
          </div>
        )

      case "tournament":
        return (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-[#B03A2E]" />
              Torneo por Llaves
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Participantes:</strong> 2 a 32 jugadores
              </p>
              <p>
                <strong>Formato:</strong> Eliminación simple
              </p>
              <p>
                <strong>Estructura:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Los jugadores se enfrentan de a pares</li>
                <li>El ganador avanza a la siguiente ronda</li>
                <li>El perdedor queda eliminado</li>
                <li>Se repite hasta que quede un campeón</li>
              </ul>
              <p>
                <strong>BYEs:</strong> Si el número de jugadores no es potencia de 2, algunos jugadores pasan
                automáticamente
              </p>
              <p>
                <strong>Tipos de emparejamiento:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Aleatorio:</strong> Los enfrentamientos se sortean al azar
                </li>
                <li>
                  <strong>Manual:</strong> El organizador elige los enfrentamientos
                </li>
              </ul>
              <p>
                <strong>Rondas:</strong> El número de rondas depende del número de participantes (log₂)
              </p>
            </div>
          </div>
        )

      default:
        return <p>Selecciona un juego para ver sus reglas.</p>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-[#F6F1D3] border-2 border-[#4C3B2C] rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2D351A] font-serif">Reglas del Juego</h2>
            <Button onClick={onClose} variant="ghost" className="text-[#2D351A] hover:bg-[#2D351A]/10">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="text-[#2D351A] font-serif">{getGameRules()}</div>
        </div>
      </div>
    </div>
  )
}
