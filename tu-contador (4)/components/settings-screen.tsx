"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sun, Moon, Type, Volume2, VolumeX, Palette, RotateCcw, Mail, MessageCircle } from "lucide-react"

interface SettingsScreenProps {
  onBack: () => void
}

interface Settings {
  darkMode: boolean
  fontSize: "small" | "medium" | "large"
  musicVolume: number
  soundEffects: boolean
  colorTheme: "classic" | "modern" | "vintage"
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    fontSize: "medium",
    musicVolume: 50,
    soundEffects: true,
    colorTheme: "classic",
  })

  // Cargar configuración desde localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("nuestro-contador-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Guardar configuración en localStorage
  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings)
    localStorage.setItem("nuestro-contador-settings", JSON.stringify(newSettings))
  }

  const toggleDarkMode = () => {
    saveSettings({ ...settings, darkMode: !settings.darkMode })
  }

  const changeFontSize = (size: "small" | "medium" | "large") => {
    saveSettings({ ...settings, fontSize: size })
  }

  const changeMusicVolume = (volume: number) => {
    saveSettings({ ...settings, musicVolume: volume })
  }

  const toggleSoundEffects = () => {
    saveSettings({ ...settings, soundEffects: !settings.soundEffects })
  }

  const changeColorTheme = (theme: "classic" | "modern" | "vintage") => {
    saveSettings({ ...settings, colorTheme: theme })
  }

  const resetSettings = () => {
    const defaultSettings: Settings = {
      darkMode: false,
      fontSize: "medium",
      musicVolume: 50,
      soundEffects: true,
      colorTheme: "classic",
    }
    saveSettings(defaultSettings)
  }

  const handleEmailContact = () => {
    window.location.href =
      "mailto:mateodea@live.com?subject=Consulta sobre Nuestro Contador&body=Hola, tengo una consulta sobre la aplicación..."
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-[#EFE8C1] hover:bg-[#3C4422] p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-serif text-[#EFE8C1] ml-4">Ajustes</h1>
        </div>

        <div className="space-y-6">
          {/* Modo Claro/Oscuro */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.darkMode ? (
                  <Moon className="w-6 h-6 text-[#EFE8C1]" />
                ) : (
                  <Sun className="w-6 h-6 text-[#EFE8C1]" />
                )}
                <div>
                  <h3 className="text-lg font-serif text-[#EFE8C1]">Modo de Pantalla</h3>
                  <p className="text-[#EFE8C1] opacity-70 text-sm">
                    {settings.darkMode ? "Modo oscuro activado" : "Modo claro activado"}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleDarkMode}
                className={`${
                  settings.darkMode ? "bg-[#2D351A]" : "bg-[#B03A2E]"
                } hover:opacity-80 text-white font-serif`}
              >
                {settings.darkMode ? "Claro" : "Oscuro"}
              </Button>
            </div>
          </div>

          {/* Tamaño de Letra */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Type className="w-6 h-6 text-[#EFE8C1]" />
              <div>
                <h3 className="text-lg font-serif text-[#EFE8C1]">Tamaño de Letra</h3>
                <p className="text-[#EFE8C1] opacity-70 text-sm">Ajusta el tamaño del texto</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["small", "medium", "large"].map((size) => (
                <Button
                  key={size}
                  onClick={() => changeFontSize(size as "small" | "medium" | "large")}
                  className={`${
                    settings.fontSize === size ? "bg-[#B03A2E]" : "bg-[#2D351A]"
                  } hover:opacity-80 text-white font-serif capitalize`}
                >
                  {size === "small" ? "Pequeño" : size === "medium" ? "Mediano" : "Grande"}
                </Button>
              ))}
            </div>
          </div>

          {/* Volumen de Música */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Volume2 className="w-6 h-6 text-[#EFE8C1]" />
              <div>
                <h3 className="text-lg font-serif text-[#EFE8C1]">Volumen de Música</h3>
                <p className="text-[#EFE8C1] opacity-70 text-sm">Ajusta el volumen de la música de fondo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <VolumeX className="w-5 h-5 text-[#EFE8C1]" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.musicVolume}
                onChange={(e) => changeMusicVolume(Number.parseInt(e.target.value))}
                className="flex-1 h-2 bg-[#2D351A] rounded-lg appearance-none cursor-pointer"
              />
              <Volume2 className="w-5 h-5 text-[#EFE8C1]" />
              <span className="text-[#EFE8C1] font-serif min-w-[3rem] text-right">{settings.musicVolume}%</span>
            </div>
          </div>

          {/* Efectos de Sonido */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.soundEffects ? (
                  <Volume2 className="w-6 h-6 text-[#EFE8C1]" />
                ) : (
                  <VolumeX className="w-6 h-6 text-[#EFE8C1]" />
                )}
                <div>
                  <h3 className="text-lg font-serif text-[#EFE8C1]">Efectos de Sonido</h3>
                  <p className="text-[#EFE8C1] opacity-70 text-sm">
                    {settings.soundEffects ? "Sonidos activados" : "Sonidos desactivados"}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleSoundEffects}
                className={`${
                  settings.soundEffects ? "bg-[#3C4422]" : "bg-[#B03A2E]"
                } hover:opacity-80 text-white font-serif`}
              >
                {settings.soundEffects ? "Desactivar" : "Activar"}
              </Button>
            </div>
          </div>

          {/* Tema de Colores */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="w-6 h-6 text-[#EFE8C1]" />
              <div>
                <h3 className="text-lg font-serif text-[#EFE8C1]">Tema de Colores</h3>
                <p className="text-[#EFE8C1] opacity-70 text-sm">Elige tu paleta de colores favorita</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "classic", name: "Clásico", color: "bg-[#2D351A]" },
                { key: "modern", name: "Moderno", color: "bg-blue-600" },
                { key: "vintage", name: "Vintage", color: "bg-amber-700" },
              ].map((theme) => (
                <Button
                  key={theme.key}
                  onClick={() => changeColorTheme(theme.key as "classic" | "modern" | "vintage")}
                  className={`${
                    settings.colorTheme === theme.key ? "bg-[#B03A2E]" : theme.color
                  } hover:opacity-80 text-white font-serif`}
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Contacto y Soporte */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6 text-[#EFE8C1]" />
              <div>
                <h3 className="text-lg font-serif text-[#EFE8C1]">Contacto y Soporte</h3>
                <p className="text-[#EFE8C1] opacity-70 text-sm">¿Tienes alguna consulta o sugerencia?</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleEmailContact}
                className="w-full bg-[#2D351A] border border-[#EFE8C1] text-[#EFE8C1] hover:bg-[#3C4422] font-serif flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Enviar Consulta por Email</span>
              </Button>

              <div className="bg-[#2D351A] rounded-lg p-4 border border-[#EFE8C1]/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-[#EFE8C1]" />
                  <span className="text-[#EFE8C1] font-serif text-sm font-semibold">Email de contacto:</span>
                </div>
                <p className="text-[#EFE8C1] font-serif text-sm opacity-90 ml-6">mateodea@live.com</p>
                <p className="text-[#EFE8C1] font-serif text-xs opacity-70 ml-6 mt-1">
                  Responderemos tu consulta lo antes posible
                </p>
              </div>
            </div>
          </div>

          {/* Restablecer Configuración */}
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-[#EFE8C1]" />
                <div>
                  <h3 className="text-lg font-serif text-[#EFE8C1]">Restablecer</h3>
                  <p className="text-[#EFE8C1] opacity-70 text-sm">Volver a la configuración predeterminada</p>
                </div>
              </div>
              <Button onClick={resetSettings} className="bg-[#B03A2E] hover:bg-[#8B2E23] text-white font-serif">
                Restablecer
              </Button>
            </div>
          </div>
        </div>

        {/* Información de la App */}
        <div className="mt-8 text-center">
          <div className="bg-[#3C4422] border-[#EFE8C1] border-2 rounded-lg p-4">
            <p className="text-[#EFE8C1] font-serif text-sm opacity-80">Nuestro Contador v1.0</p>
            <p className="text-[#EFE8C1] font-serif text-xs opacity-60 mt-1">
              Aplicación para llevar puntuación de juegos de mesa
            </p>
            <p className="text-[#EFE8C1] font-serif text-xs opacity-50 mt-2">
              Desarrollado con ❤️ para la comunidad de jugadores
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
