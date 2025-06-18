import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nuestro Contador",
  description: "Aplicación para llevar puntuación de juegos de mesa y cartas",
  keywords: ["juegos", "contador", "puntuación", "mesa", "cartas", "truco", "chinchón", "uno"],
  authors: [{ name: "Nuestro Contador Team" }],
  creator: "Nuestro Contador",
  publisher: "Nuestro Contador",
  robots: "index, follow",
  openGraph: {
    title: "Nuestro Contador",
    description: "Lleva la puntuación de tus juegos de mesa y cartas favoritos",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuestro Contador",
    description: "Lleva la puntuación de tus juegos de mesa y cartas favoritos",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2D351A",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-serif">{children}</body>
    </html>
  )
}
