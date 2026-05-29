'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { roomService } from '../../services/roomService';

function JoinRoomForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [displayName, setDisplayName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('roomId');
    if (code) setRoomCode(code.toUpperCase());
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedName = displayName.trim();
    const trimmedCode = roomCode.trim().toUpperCase();

    if (!trimmedName) {
      setError('DISPLAY_NAME is required so others can identify you.');
      return;
    }
    if (!trimmedCode || trimmedCode.length !== 6) {
      setError('A valid 6-character ROOM_CODE is required.');
      return;
    }

    setIsLoading(true);
    try {
      await roomService.getRoomDetails(trimmedCode);
      sessionStorage.setItem(`username_${trimmedCode}`, trimmedName);
      router.push(`/room/${trimmedCode}`);
    } catch (err: any) {
      console.error('Room validation failed:', err);
      setError('ROOM_NOT_FOUND — verify the code is correct and the room is active.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md border border-brand-border bg-brand-bg-sec/40 glassmorphism shadow-[0_0_60px_rgba(11,15,20,0.6)] flex flex-col"
    >
      {/* Card header bar */}
      <div className="px-7 pt-6 pb-4 border-b border-brand-border/50 flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-[0_0_12px_rgba(59,130,246,0.15)]">
          <Users size={18} />
        </div>
        <div>
          <h2 className="font-space-grotesk text-base font-black tracking-wide text-brand-primary uppercase">
            Join Coding Session
          </h2>
          <p className="font-inter text-[11px] text-brand-secondary/50 mt-0.5">Enter your details to connect</p>
        </div>
      </div>

      <div className="px-7 py-6 flex flex-col gap-5">
        <p className="font-inter text-[11px] text-brand-secondary/60 leading-relaxed">
          Enter your display name and the 6-character room code to connect to the synchronized editor workspace.
        </p>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 border border-red-500/30 bg-red-950/15 text-red-400 text-xs flex items-start gap-2"
          >
            <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
            <span className="font-jetbrains-mono text-[10px] leading-relaxed">{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Display Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jetbrains-mono text-[10px] font-bold text-brand-secondary/70 tracking-[0.15em] uppercase">
              DISPLAY_NAME
            </label>
            <input
              type="text"
              placeholder="e.g. Adarsh Jha"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={20}
              required
              className="w-full bg-brand-bg border border-brand-border hover:border-brand-secondary/40 focus:border-brand-blue focus:outline-none focus:ring-0 px-3 py-2.5 font-inter text-sm text-brand-primary placeholder:text-brand-secondary/30 transition-colors duration-150"
            />
          </div>

          {/* Room Code */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jetbrains-mono text-[10px] font-bold text-brand-secondary/70 tracking-[0.15em] uppercase">
              ROOM_CODE
            </label>
            <input
              type="text"
              placeholder="A1B2C3"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              required
              className="w-full bg-brand-bg border border-brand-border hover:border-brand-secondary/40 focus:border-brand-blue focus:outline-none focus:ring-0 px-3 py-2.5 font-jetbrains-mono text-base font-bold text-brand-blue text-center tracking-[0.35em] placeholder:text-brand-secondary/30 placeholder:tracking-normal transition-colors duration-150"
            />
            <span className="font-jetbrains-mono text-[9px] text-brand-secondary/30 tracking-widest">
              6 CHARACTERS REQUIRED
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-jetbrains-mono text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 mt-1 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                CONNECTING...
              </>
            ) : (
              <>
                CONNECT_TO_ROOM
                <ArrowRight size={13} />
              </>
            )}
          </button>
        </form>

        {/* Bottom hint */}
        <div className="border-t border-brand-border/40 pt-4 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green/60" />
          <p className="font-inter text-[11px] text-brand-secondary/40 text-center">
            End-to-end encrypted session
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function JoinRoomPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-primary">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 relative">
        {/* Dot grid bg */}
        <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
        {/* Glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-brand-blue/4 blur-[120px] pointer-events-none" />



        <div className="relative z-10 w-full max-w-md">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center text-brand-secondary gap-3 py-16">
                <Loader2 size={28} className="animate-spin text-brand-blue" />
                <span className="font-jetbrains-mono text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                  PREPARING_GATEWAY...
                </span>
              </div>
            }
          >
            <JoinRoomForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
