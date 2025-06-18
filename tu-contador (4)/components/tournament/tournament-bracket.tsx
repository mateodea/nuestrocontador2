"use client"

import { Button } from "@/components/ui/button"
import { Trophy, Crown, ArrowLeft, RotateCcw } from "lucide-react"
import type { Tournament, Match, TournamentPlayer } from "@/types/tournament"
import { getRoundName } from "@/utils/tournament"

interface TournamentBracketProps {
  tournament: Tournament
  onMatchWinner: (matchId: string, winner: TournamentPlayer) => void
  onBack: () => void
  onNewTournament: () => void
}

export function TournamentBracket({ tournament, onMatchWinner, onBack, onNewTournament }: TournamentBracketProps) {
  const getMatchesByRound = () => {
    const rounds: { [key: number]: Match[] } = {}
    tournament.matches.forEach((match) => {
      if (!rounds[match.round]) rounds[match.round] = []
      rounds[match.round].push(match)
    })
    return rounds
  }

  if (tournament.isComplete && tournament.champion) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-700 border-4 rounded-lg max-w-md w-full shadow-2xl p-8 text-center relative">
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
            <div
              className="absolute top-0 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-1/4 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>

          <div className="relative z-10">
            <Crown className="w-20 h-20 text-yellow-800 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-yellow-900 mb-2">¡Campeón!</h1>
            <p className="text-3xl font-serif text-yellow-800 mb-6">{tournament.champion.name}</p>
            <p className="text-lg text-yellow-800 mb-8">Ha ganado el torneo por llaves</p>

            <div className="space-y-3">
              <Button
                onClick={onNewTournament}
                className="w-full bg-[#3C4422] hover:bg-[#4C5532] text-white py-3 font-serif"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Nuevo Torneo
              </Button>
              <Button onClick={onBack} className="w-full bg-[#B03A2E] hover:bg-[#8B2E23] text-white py-3 font-serif">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const matchesByRound = getMatchesByRound()
  const rounds = Object.keys(matchesByRound)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="min-h-screen p-4 bg-[#2D351A]">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-serif text-[#EFE8C1] ml-4">Torneo por Llaves</h1>
          </div>
          <Trophy className="w-8 h-8 text-[#EFE8C1]" />
        </div>

        {/* Tournament Bracket - Improved Design */}
        <div className="overflow-x-auto pb-8">
          <div className="flex justify-center min-w-max">
            <div className="relative">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="text-[#EFE8C1]">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative flex items-center justify-center gap-16 md:gap-24 lg:gap-32">
                {rounds.map((round, roundIndex) => {
                  const matches = matchesByRound[round]
                  const roundName = getRoundName(round, tournament.totalRounds)
                  const isCurrentRound = round === tournament.currentRound

                  // Calculate vertical spacing based on round
                  const verticalSpacing = Math.pow(2, roundIndex) * 80
                  const matchHeight = 140

                  return (
                    <div key={round} className="flex flex-col items-center relative">
                      {/* Round Title with improved styling */}
                      <div
                        className={`mb-8 px-6 py-3 rounded-xl border-3 shadow-lg transform transition-all duration-300 ${
                          isCurrentRound
                            ? "bg-gradient-to-r from-[#B03A2E] to-[#8B2E23] border-[#EFE8C1] text-white scale-105 shadow-[#B03A2E]/50"
                            : "bg-gradient-to-r from-[#3C4422] to-[#2D351A] border-[#EFE8C1] text-[#EFE8C1] hover:scale-102"
                        }`}
                      >
                        <h2 className="text-lg md:text-xl font-serif text-center font-bold tracking-wide">
                          {roundName}
                        </h2>
                        <div className="text-xs opacity-80 text-center mt-1">
                          {matches.filter((m) => m.winner).length}/{matches.length} completos
                        </div>
                      </div>

                      {/* Matches Container with improved spacing */}
                      <div
                        className="flex flex-col justify-center relative"
                        style={{
                          gap: `${verticalSpacing}px`,
                          minHeight: `${matches.length * (matchHeight + verticalSpacing)}px`,
                        }}
                      >
                        {matches.map((match, matchIndex) => (
                          <div key={match.id} className="relative">
                            {/* Enhanced Connection Lines */}
                            {roundIndex < rounds.length - 1 && match.winner && (
                              <>
                                {/* Horizontal line to the right */}
                                <div
                                  className="absolute bg-gradient-to-r from-[#EFE8C1] to-transparent rounded-full shadow-sm"
                                  style={{
                                    top: "50%",
                                    left: "100%",
                                    width: "60px",
                                    height: "3px",
                                    transform: "translateY(-50%)",
                                    zIndex: 1,
                                  }}
                                ></div>

                                {/* Vertical connector for paired matches */}
                                {matchIndex % 2 === 0 && matchIndex + 1 < matches.length && (
                                  <div
                                    className="absolute bg-[#EFE8C1] rounded-full shadow-sm"
                                    style={{
                                      top: "50%",
                                      left: `calc(100% + 60px)`,
                                      width: "3px",
                                      height: `${verticalSpacing + matchHeight}px`,
                                      transform: "translateY(-50%)",
                                      zIndex: 1,
                                    }}
                                  ></div>
                                )}

                                {/* Final horizontal line to next round */}
                                <div
                                  className="absolute bg-gradient-to-r from-transparent to-[#EFE8C1] rounded-full shadow-sm"
                                  style={{
                                    top:
                                      matchIndex % 2 === 0
                                        ? `calc(50% + ${verticalSpacing / 2 + matchHeight / 2}px)`
                                        : `calc(50% - ${verticalSpacing / 2 + matchHeight / 2}px)`,
                                    left: `calc(100% + 60px)`,
                                    width: "60px",
                                    height: "3px",
                                    zIndex: 1,
                                  }}
                                ></div>
                              </>
                            )}

                            {/* Enhanced Match Card */}
                            <div
                              className={`bg-gradient-to-br from-[#F6F1D3] to-[#EFE8C1] border-3 border-[#4C3B2C] rounded-xl p-4 shadow-xl transition-all duration-300 w-64 relative overflow-hidden ${
                                isCurrentRound
                                  ? "ring-4 ring-[#B03A2E] ring-opacity-50 transform hover:scale-105"
                                  : "hover:shadow-2xl hover:-translate-y-1"
                              }`}
                              style={{ minHeight: `${matchHeight}px` }}
                            >
                              {/* Match number indicator */}
                              <div className="absolute top-2 right-2 bg-[#4C3B2C] text-[#EFE8C1] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {matchIndex + 1}
                              </div>

                              {/* Player 1 */}
                              <div
                                className={`p-3 rounded-lg mb-3 text-center transition-all duration-300 ${
                                  match.winner?.id === match.player1?.id
                                    ? "bg-gradient-to-r from-green-200 to-green-300 border-2 border-green-500 font-bold shadow-lg transform scale-105"
                                    : "bg-white border-2 border-[#4C3B2C] hover:bg-gray-50"
                                }`}
                              >
                                <p className="text-[#4C3B2C] font-serif text-sm font-semibold truncate">
                                  {match.player1?.isBye ? (
                                    <span className="text-blue-600">🎯 BYE</span>
                                  ) : (
                                    match.player1?.name
                                  )}
                                </p>
                              </div>

                              {/* VS Divider */}
                              <div className="text-center mb-3 relative">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full border-t border-[#4C3B2C] opacity-30"></div>
                                </div>
                                <div className="relative bg-[#F6F1D3] px-3">
                                  <p className="text-[#4C3B2C] font-bold text-sm">VS</p>
                                </div>
                              </div>

                              {/* Player 2 */}
                              <div
                                className={`p-3 rounded-lg mb-4 text-center transition-all duration-300 ${
                                  match.winner?.id === match.player2?.id
                                    ? "bg-gradient-to-r from-green-200 to-green-300 border-2 border-green-500 font-bold shadow-lg transform scale-105"
                                    : "bg-white border-2 border-[#4C3B2C] hover:bg-gray-50"
                                }`}
                              >
                                <p className="text-[#4C3B2C] font-serif text-sm font-semibold truncate">
                                  {match.player2?.isBye ? (
                                    <span className="text-blue-600">🎯 BYE</span>
                                  ) : (
                                    match.player2?.name
                                  )}
                                </p>
                              </div>

                              {/* Actions */}
                              {isCurrentRound && !match.winner && (
                                <div className="space-y-2">
                                  {match.player1 && !match.player1.isBye && (
                                    <Button
                                      onClick={() => onMatchWinner(match.id, match.player1!)}
                                      className="w-full bg-gradient-to-r from-[#3C4422] to-[#2D351A] hover:from-[#4C5532] hover:to-[#3C4422] text-white py-2 text-xs font-serif shadow-md transition-all duration-300 hover:shadow-lg"
                                    >
                                      ✓ {match.player1.name.split(" ")[0]} Gana
                                    </Button>
                                  )}
                                  {match.player2 && !match.player2.isBye && (
                                    <Button
                                      onClick={() => onMatchWinner(match.id, match.player2!)}
                                      className="w-full bg-gradient-to-r from-[#3C4422] to-[#2D351A] hover:from-[#4C5532] hover:to-[#3C4422] text-white py-2 text-xs font-serif shadow-md transition-all duration-300 hover:shadow-lg"
                                    >
                                      ✓ {match.player2.name.split(" ")[0]} Gana
                                    </Button>
                                  )}
                                </div>
                              )}

                              {/* Winner Display */}
                              {match.winner && (
                                <div className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 rounded-lg p-3 shadow-inner">
                                  <p className="text-green-800 text-center font-serif text-sm font-bold flex items-center justify-center">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Ganador
                                  </p>
                                </div>
                              )}

                              {/* BYE Message */}
                              {(match.player1?.isBye || match.player2?.isBye) && match.winner && (
                                <div className="bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-500 rounded-lg p-2 mt-2 shadow-inner">
                                  <p className="text-blue-800 text-center font-serif text-xs font-semibold">
                                    🎯 Pase Automático
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Current Round Info */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-[#3C4422] to-[#2D351A] border-2 border-[#EFE8C1] rounded-xl p-6 inline-block shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-6 h-6 text-[#EFE8C1]" />
              <div>
                <p className="text-[#EFE8C1] font-serif text-lg font-bold">
                  {getRoundName(tournament.currentRound, tournament.totalRounds)}
                </p>
                <p className="text-[#EFE8C1] opacity-80 text-sm">
                  Ronda {tournament.currentRound} de {tournament.totalRounds}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
