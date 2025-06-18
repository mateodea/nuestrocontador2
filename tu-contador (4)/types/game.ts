export type GameType = "truco" | "chinchon" | "uno" | "chancho" | "escoba" | "casita"

export interface Player {
  id: string
  name: string
  score: number
  isEliminated?: boolean
}

export interface GameConfig {
  name: string
  maxPlayers: number
  minPlayers: number
  winningScore: number
  isTeamGame: boolean
  allowNegativeScores?: boolean
  isLosingGame?: boolean
  isEliminationGame?: boolean // Para juegos como Chinchón donde se eliminan jugadores
}

export const GAMES: Record<GameType, GameConfig> = {
  truco: { name: "Truco", maxPlayers: 2, minPlayers: 2, winningScore: 30, isTeamGame: true },
  chinchon: {
    name: "Chinchón",
    maxPlayers: 8,
    minPlayers: 2,
    winningScore: 100,
    isTeamGame: false,
    allowNegativeScores: true,
    isEliminationGame: true,
  },
  uno: { name: "UNO", maxPlayers: 10, minPlayers: 2, winningScore: 500, isTeamGame: false },
  chancho: { name: "Chancho", maxPlayers: 10, minPlayers: 2, winningScore: 7, isTeamGame: false, isLosingGame: true },
  escoba: { name: "Escoba de 15", maxPlayers: 4, minPlayers: 2, winningScore: 15, isTeamGame: false },
  casita: { name: "Casita Robada", maxPlayers: 6, minPlayers: 2, winningScore: 100, isTeamGame: false },
}

export interface WinnerModalProps {
  winner: Player | null
  onNewGame: () => void
  onRestart: () => void
}

// Mapeo de puntos a letras para Chancho
export const CHANCHO_LETTERS = {
  0: "",
  1: "C",
  2: "H",
  3: "A",
  4: "N",
  5: "C",
  6: "H",
  7: "O",
}
