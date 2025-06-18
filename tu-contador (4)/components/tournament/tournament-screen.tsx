"use client"

import { useState } from "react"
import { TournamentSetup } from "@/components/tournament/tournament-setup"
import { TournamentBracket } from "@/components/tournament/tournament-bracket"
import type { Tournament, TournamentPlayer } from "@/types/tournament"
import { createTournament, setMatchWinner } from "@/utils/tournament"

interface TournamentScreenProps {
  onBack: () => void
}

export function TournamentScreen({ onBack }: TournamentScreenProps) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [phase, setPhase] = useState<"setup" | "playing">("setup")

  const handleTournamentStart = (playerNames: string[], isRandomPairing: boolean) => {
    const newTournament = createTournament(playerNames, isRandomPairing)
    setTournament(newTournament)
    setPhase("playing")
  }

  const handleMatchWinner = (matchId: string, winner: TournamentPlayer) => {
    if (tournament) {
      const updatedTournament = setMatchWinner(tournament, matchId, winner)
      setTournament(updatedTournament)
    }
  }

  const handleNewTournament = () => {
    setTournament(null)
    setPhase("setup")
  }

  if (phase === "setup") {
    return <TournamentSetup onTournamentStart={handleTournamentStart} onBack={onBack} />
  }

  if (tournament) {
    return (
      <TournamentBracket
        tournament={tournament}
        onMatchWinner={handleMatchWinner}
        onBack={onBack}
        onNewTournament={handleNewTournament}
      />
    )
  }

  return null
}
