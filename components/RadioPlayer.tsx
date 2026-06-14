// components/RadioPlayer.tsx
'use client';

import { useState, useRef, useEffect } from "react";
import { client } from "@/lib/sanity/client";

interface RadioConfig {
  isActive: boolean;
  streamUrl: string;
  stationName: string;
  tagline: string;
  sundayStreamUrl?: string;
  sundayStationName?: string;
  sundayTagline?: string;
}

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<RadioConfig | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎯 Fetch de configuración desde Sanity
  useEffect(() => {
    async function fetchRadioConfig() {
      try {
        const query = `*[_type == "radioStream"][0]{
          isActive,
          streamUrl,
          stationName,
          tagline,
          sundayStreamUrl,
          sundayStationName,
          sundayTagline
        }`;
        
        const data = await client.fetch(query);
        
        if (data) {
          // Detectar si es domingo
          const today = new Date().getDay(); // 0 = Domingo, 1-6 = Lunes a Sábado
          const isSunday = today === 0;
          
          if (isSunday && data.sundayStreamUrl) {
            // Usar configuración dominical
            setConfig({
              isActive: data.isActive,
              streamUrl: data.sundayStreamUrl,
              stationName: data.sundayStationName || "Radio Domingo",
              tagline: data.sundayTagline || "Programa especial",
            });
          } else {
            // Usar configuración de lunes a sábado
            setConfig({
              isActive: data.isActive,
              streamUrl: data.streamUrl,
              stationName: data.stationName,
              tagline: data.tagline,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching radio config:", error);
      }
    }

    fetchRadioConfig();
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !config) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        audioRef.current.src = config.streamUrl;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error al reproducir radio:", error);
        alert("No se pudo conectar a la radio. Verifica tu conexión.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOnError = () => {
    setIsPlaying(false);
    setIsLoading(false);
  };

  // Loading state mientras carga la config
  if (!config) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 shadow-2xl z-40">
        <div className="container mx-auto flex items-center justify-center">
          <span className="text-sm text-gray-400">Cargando radio...</span>
        </div>
      </div>
    );
  }

  // Si está desactivada desde Sanity
  if (!config.isActive) {
    return null;
  }

  return (
    <div 
      id="radio-player" 
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 shadow-2xl z-40 border-t border-gray-700"
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Info de la Radio */}
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Indicador de "En Vivo" */}
          <div className="flex items-center gap-1.5">
            <span className={`block w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 hidden sm:block">
              {isPlaying ? "En Vivo" : "Radio Offline"}
            </span>
          </div>
          
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-white truncate">{config.stationName}</span>
            <span className="text-xs text-gray-400 truncate">{config.tagline}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4">
          
          {/* Botón Play/Pause */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full text-white transition shadow-lg active:scale-95 disabled:opacity-50"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isLoading ? (
              // Spinner de carga
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isPlaying ? (
              // Icono Pausa
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              // Icono Play
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Elemento de Audio Invisible */}
      <audio
        ref={audioRef}
        onError={handleOnError}
        preload="none"
        src={isPlaying ? `${config.streamUrl}?t=${Date.now()}` : undefined}
      />
    </div>
  );
}