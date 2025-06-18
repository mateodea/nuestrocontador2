export interface TournamentPlayer {
  id: string
  name: string
  isBye?: boolean
}

export interface Match {
  id: string
  player1: TournamentPlayer | null
  player2: TournamentPlayer | null
  winner: TournamentPlayer | null
  round: number
  position: number
}

export interface Tournament {
  id: string
  name: string
  players: TournamentPlayer[]
  matches: Match[]
  currentRound: number
  totalRounds: number
  champion: TournamentPlayer | null
  isComplete: boolean
}

export interface TournamentState {
  tournament: Tournament | null
  isCreating: boolean
  isPlaying: boolean
}
