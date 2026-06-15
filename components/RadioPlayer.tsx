// components/RadioPlayer.tsx
'use client';

import { useState, useRef, useEffect } from "react";
import { client } from "@/lib/sanity/client";

interface RadioConfig {
  isActive: boolean;
  streamUrl: string;
  stationName: string;
  tagline: string;
}

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<RadioConfig | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
          const today = new Date().getDay();
          const isSunday = today === 0;
          
          if (isSunday && data.sundayStreamUrl) {
            setConfig({
              isActive: data.isActive,
              streamUrl: data.sundayStreamUrl,
              stationName: data.sundayStationName || "Radio Domingo",
              tagline: data.sundayTagline || "Programa especial",
            });
          } else {
            setConfig({
              isActive: data.isActive,
              streamUrl: data.streamUrl,
              stationName: data.stationName,
              tagline: data.tagline,
            });
          }
          console.log('✅ Radio config cargada:', data.stationName);
        }
      } catch (error) {
        console.error("❌ Error fetching radio config:", error);
      }
    }

    fetchRadioConfig();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!config || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('⏸️ Radio pausada');
    } else {
      setIsLoading(true);
      console.log('▶️ Intentando reproducir:', config.streamUrl);
      
      try {
        // Limpiar src anterior
        audioRef.current.src = '';
        audioRef.current.load();
        
        // Pequeño delay para asegurar carga
        await new Promise(resolve => setTimeout(resolve, 100));
        
        audioRef.current.src = config.streamUrl;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('✅ Radio reproduciendo');
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('❌ Error al reproducir:', error);
        // Intentar con HTTP si HTTPS falla
        const httpUrl = config.streamUrl.replace('https://', 'http://');
        console.log('🔄 Intentando con HTTP:', httpUrl);
        
        try {
          audioRef.current.src = httpUrl;
          audioRef.current.load();
          await audioRef.current.play();
          console.log('✅ Radio reproduciendo (HTTP)');
          setIsPlaying(true);
        } catch (httpError) {
          console.error('❌ Error HTTP también:', httpError);
          alert('No se pudo conectar a la radio. Verificá la URL en Sanity.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? '🔊 Sonido activado' : '🔇 Silenciado');
  };

  const handleOnError = (e: any) => {
    console.error("❌ Error de audio:", e);
    setIsPlaying(false);
  };

  if (!config) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 shadow-2xl z-40">
        <div className="container mx-auto flex items-center justify-center">
          <span className="text-sm text-gray-400">Cargando radio...</span>
        </div>
      </div>
    );
  }

  if (!config.isActive) return null;

  return (
    <div 
      id="radio-player" 
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 shadow-2xl z-40 border-t border-gray-700"
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Info de la Radio */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className={`block w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 hidden sm:block">
              {isPlaying ? "En Vivo" : "Listo"}
            </span>
          </div>
          
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-white truncate">{config.stationName}</span>
            <span className="text-xs text-gray-400 truncate">{config.tagline}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Control de Volumen - SIEMPRE VISIBLE */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-gray-700 rounded transition"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : volume < 0.5 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 md:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600"
              aria-label="Volumen"
              title="Control de volumen"
            />
          </div>

          {/* Botón Play/Pause */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full text-white transition shadow-lg active:scale-95 disabled:opacity-50"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        onError={handleOnError}
        preload="none"
        crossOrigin="anonymous"
      />
    </div>
  );
}