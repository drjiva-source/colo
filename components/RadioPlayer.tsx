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
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch con try/catch
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
        }
      } catch (err) {
        console.error("❌ Error al cargar config de radio:", err);
        setError("Error al cargar configuración");
      }
    }

    fetchRadioConfig();
  }, []);

  // Control de volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!config || !audioRef.current) {
      console.error("❌ No hay config o audioRef");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setError(null);
    } else {
      setIsLoading(true);
      setError(null);
      
      try {
        // Limpiar src anterior
        audioRef.current.src = '';
        audioRef.current.load();
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Probar URL directa
        audioRef.current.src = config.streamUrl;
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout de 5s')), 5000)
        );
        
        await Promise.race([playPromise, timeoutPromise]);
        
        setIsPlaying(true);
        console.log('✅ Reproduciendo:', config.streamUrl);
      } catch (err: any) {
        console.error('❌ Error al reproducir:', err.message);
        
        // Intentar con HTTP si HTTPS falla
        if (config.streamUrl.startsWith('https://')) {
          try {
            const httpUrl = config.streamUrl.replace('https://', 'http://');
            console.log('🔄 Intentando HTTP:', httpUrl);
            
            audioRef.current.src = httpUrl;
            audioRef.current.load();
            await audioRef.current.play();
            
            setIsPlaying(true);
            console.log('✅ Reproduciendo (HTTP):', httpUrl);
          } catch (httpErr: any) {
            console.error('❌ HTTP también falló:', httpErr.message);
            setError("No se pudo conectar. Verificá la URL en Sanity.");
            setIsPlaying(false);
          }
        } else {
          setError("No se pudo conectar. Verificá la URL en Sanity.");
          setIsPlaying(false);
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
  };

  if (!config || !config.isActive) return null;

  return (
    <div 
      id="radio-player" 
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 shadow-2xl z-50 border-t border-gray-700"
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className={`block w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 hidden sm:block">
              {isPlaying ? "En Vivo" : "Listo"}
            </span>
          </div>
          
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-bold text-white truncate">{config.stationName}</span>
            <span className="text-xs text-gray-400 truncate">
              {error || config.tagline}
            </span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          
          {/* Volumen */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-gray-700 rounded transition"
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
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
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600"
              title="Volumen"
            />
          </div>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full text-white transition shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Audio Element SIN onError para evitar error al montar */}
      <audio
        ref={audioRef}
        preload="none"
      />
    </div>
  );
}