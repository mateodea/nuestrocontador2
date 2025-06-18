import type { TournamentPlayer, Match, Tournament } from "@/types/tournament"

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getNextPowerOfTwo(n: number): number {
  return Math.pow(2, Math.ceil(Math.log2(n)))
}

export function calculateByes(playerCount: number): number {
  const nextPower = getNextPowerOfTwo(playerCount)
  return nextPower - playerCount
}

export function calculateRounds(playerCount: number): number {
  const nextPower = getNextPowerOfTwo(playerCount)
  return Math.log2(nextPower)
}

export function createTournament(playerNames: string[], isRandomPairing = true): Tournament {
  const players: TournamentPlayer[] = playerNames.map((name, index) => ({
    id: `player-${index}`,
    name: name.trim() || `Jugador ${index + 1}`,
  }))

  // Agregar BYEs si es necesario
  const byeCount = calculateByes(players.length)
  for (let i = 0; i < byeCount; i++) {
    players.push({
      id: `bye-${i}`,
      name: "BYE",
      isBye: true,
    })
  }

  // Distribuir BYEs de manera equilibrada para evitar dos BYEs juntos
  const finalPlayers = distributeByes(players, isRandomPairing)
  const totalRounds = calculateRounds(playerNames.length)

  // Crear primera ronda de partidos
  const firstRoundMatches = createFirstRoundMatches(finalPlayers)

  const tournament: Tournament = {
    id: `tournament-${Date.now()}`,
    name: "Torneo por Llaves",
    players: finalPlayers,
    matches: firstRoundMatches,
    currentRound: 1,
    totalRounds,
    champion: null,
    isComplete: false,
  }

  return tournament
}

function distributeByes(players: TournamentPlayer[], isRandomPairing: boolean): TournamentPlayer[] {
  const realPlayers = players.filter((p) => !p.isBye)
  const byes = players.filter((p) => p.isBye)

  if (isRandomPairing) {
    // Mezclar solo los jugadores reales
    const shuffledRealPlayers = shuffle(realPlayers)

    // Distribuir BYEs de manera que no queden juntos
    const result: TournamentPlayer[] = []
    const byePositions = new Set<number>()

    // Calcular posiciones para BYEs evitando que estén consecutivos
    if (byes.length > 0) {
      const totalPositions = shuffledRealPlayers.length + byes.length
      const interval = Math.floor(totalPositions / byes.length)

      for (let i = 0; i < byes.length; i++) {
        let position = i * interval + Math.floor(interval / 2)
        // Asegurar que no haya dos BYEs consecutivos
        while (byePositions.has(position) || byePositions.has(position - 1) || byePositions.has(position + 1)) {
          position = (position + 1) % totalPositions
        }
        byePositions.add(position)
      }
    }

    // Construir el array final
    let realPlayerIndex = 0
    let byeIndex = 0

    for (let i = 0; i < shuffledRealPlayers.length + byes.length; i++) {
      if (byePositions.has(i) && byeIndex < byes.length) {
        result.push(byes[byeIndex])
        byeIndex++
      } else if (realPlayerIndex < shuffledRealPlayers.length) {
        result.push(shuffledRealPlayers[realPlayerIndex])
        realPlayerIndex++
      }
    }

    return result
  } else {
    // Para emparejamiento manual, simplemente concatenar
    return [...realPlayers, ...byes]
  }
}

function createFirstRoundMatches(players: TournamentPlayer[]): Match[] {
  const matches: Match[] = []

  for (let i = 0; i < players.length; i += 2) {
    const match: Match = {
      id: `match-1-${i / 2}`,
      player1: players[i],
      player2: players[i + 1],
      winner: null,
      round: 1,
      position: i / 2,
    }

    // Si uno de los jugadores es BYE, el otro avanza automáticamente
    if (players[i].isBye) {
      match.winner = players[i + 1]
    } else if (players[i + 1].isBye) {
      match.winner = players[i]
    }

    matches.push(match)
  }

  return matches
}

export function setMatchWinner(tournament: Tournament, matchId: string, winner: TournamentPlayer): Tournament {
  const updatedMatches = tournament.matches.map((match) => (match.id === matchId ? { ...match, winner } : match))

  const updatedTournament = { ...tournament, matches: updatedMatches }

  // Verificar si la ronda actual está completa
  const currentRoundMatches = updatedMatches.filter((match) => match.round === tournament.currentRound)
  const allMatchesComplete = currentRoundMatches.every((match) => match.winner !== null)

  if (allMatchesComplete) {
    if (tournament.currentRound === tournament.totalRounds) {
      // Torneo completo
      const finalMatch = currentRoundMatches[0]
      return {
        ...updatedTournament,
        champion: finalMatch.winner,
        isComplete: true,
      }
    } else {
      // Crear siguiente ronda
      const winners = currentRoundMatches.map((match) => match.winner!).filter(Boolean)
      const nextRoundMatches = createNextRoundMatches(winners, tournament.currentRound + 1)

      return {
        ...updatedTournament,
        matches: [...updatedMatches, ...nextRoundMatches],
        currentRound: tournament.currentRound + 1,
      }
    }
  }

  return updatedTournament
}

function createNextRoundMatches(winners: TournamentPlayer[], round: number): Match[] {
  const matches: Match[] = []

  for (let i = 0; i < winners.length; i += 2) {
    const match: Match = {
      id: `match-${round}-${i / 2}`,
      player1: winners[i],
      player2: winners[i + 1],
      winner: null,
      round,
      position: i / 2,
    }

    matches.push(match)
  }

  return matches
}

export function getRoundName(round: number, totalRounds: number): string {
  if (round === totalRounds) return "Final"
  if (round === totalRounds - 1) return "Semifinal"
  if (round === totalRounds - 2) return "Cuartos de Final"
  if (round === totalRounds - 3) return "Octavos de Final"
  return `Ronda ${round}`
}
