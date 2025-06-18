"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/home-screen"
import { GameSelector } from "@/components/game-selector"
import { PlayerSetup } from "@/components/player-setup"
import { Scoreboard } from "@/components/scoreboard"
import { WinnerModal } from "@/components/winner-modal"
import { TournamentScreen } from "@/components/tournament/tournament-screen"
import { SettingsScreen } from "@/components/settings-screen"
import type { GameType as GameTypeAlias, Player as PlayerAlias } from "@/types/game"
import { GAMES } from "@/types/game"

export type GameType = GameTypeAlias
export type Player = PlayerAlias

export interface GameConfig {
  type: GameType
  players: Player[]
  maxScore?: number
}

export default function NuestroContador() {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "gameSelector" | "playerSetup" | "scoreboard" | "tournament" | "settings"
  >("home")
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [winner, setWinner] = useState<Player | null>(null)

  const handleGameSelect = (game: GameType) => {
    setSelectedGame(game)
    setCurrentScreen("playerSetup")
  }

  const handlePlayersReady = (playerList: Player[]) => {
    setPlayers(playerList)
    setCurrentScreen("scoreboard")
  }

  const handleScoreUpdate = (playerId: string, newScore: number) => {
    const updatedPlayers = players.map((player) => (player.id === playerId ? { ...player, score: newScore } : player))
    setPlayers(updatedPlayers)

    // Check for winner/loser
    if (selectedGame) {
      const gameConfig = GAMES[selectedGame]

      if (gameConfig.isLosingGame) {
        // Para juegos donde perder es el objetivo (como Chancho)
        const losingPlayer = updatedPlayers.find((player) => player.score >= gameConfig.winningScore)
        if (losingPlayer && !winner) {
          setWinner(losingPlayer)
        }
      } else if (gameConfig.isEliminationGame) {
        // Para Chinchón, verificar si queda solo un jugador
        const activePlayers = updatedPlayers.filter((p) => !p.isEliminated)
        if (activePlayers.length === 1 && !winner) {
          setWinner(activePlayers[0])
        }
      } else {
        // Para juegos normales donde ganar es el objetivo
        const winningPlayer = updatedPlayers.find((player) => player.score >= gameConfig.winningScore)
        if (winningPlayer && !winner) {
          setWinner(winningPlayer)
        }
      }
    }
  }

  const handlePlayerEliminate = (playerId: string) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, isEliminated: true } : player,
    )
    setPlayers(updatedPlayers)

    // Verificar si queda solo un jugador activo
    const activePlayers = updatedPlayers.filter((p) => !p.isEliminated)
    if (activePlayers.length === 1 && !winner) {
      setWinner(activePlayers[0])
    }
  }

  const handleNewGame = () => {
    setCurrentScreen("home")
    setSelectedGame(null)
    setPlayers([])
    setWinner(null)
  }

  const handleRestartGame = () => {
    setPlayers(players.map((player) => ({ ...player, score: 0, isEliminated: false })))
    setWinner(null)
  }

  const isLosingGame = selectedGame ? GAMES[selectedGame].isLosingGame : false

  return (
    <div className="min-h-screen bg-[#2D351A]">
      {currentScreen === "home" && (
        <HomeScreen
          onStartGame={() => setCurrentScreen("gameSelector")}
          onOpenSettings={() => setCurrentScreen("settings")}
          onCreateTournament={() => setCurrentScreen("tournament")}
        />
      )}

      {currentScreen === "gameSelector" && (
        <GameSelector onGameSelect={handleGameSelect} onBack={() => setCurrentScreen("home")} />
      )}

      {currentScreen === "playerSetup" && selectedGame && (
        <PlayerSetup
          game={selectedGame}
          onPlayersReady={handlePlayersReady}
          onBack={() => setCurrentScreen("gameSelector")}
        />
      )}

      {currentScreen === "scoreboard" && selectedGame && (
        <Scoreboard
          game={selectedGame}
          players={players}
          onScoreUpdate={handleScoreUpdate}
          onPlayerEliminate={handlePlayerEliminate}
          onEndGame={handleNewGame}
        />
      )}

      {currentScreen === "tournament" && <TournamentScreen onBack={() => setCurrentScreen("home")} />}

      {currentScreen === "settings" && <SettingsScreen onBack={() => setCurrentScreen("home")} />}

      {winner && (
        <WinnerModal
          winner={winner}
          onNewGame={handleNewGame}
          onRestart={handleRestartGame}
          isLosingGame={isLosingGame}
        />
      )}
    </div>
  )
}
