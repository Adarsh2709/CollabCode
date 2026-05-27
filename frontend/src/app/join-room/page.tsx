'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Terminal, Users, User, ArrowRight, AlertCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { roomService } from '../../services/roomService';

function JoinRoomForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [displayName, setDisplayName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autofill roomCode if passed in query parameters
  useEffect(() => {
    const code = searchParams.get('roomId');
    if (code) {
      setRoomCode(code.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = displayName.trim();
    const trimmedCode = roomCode.trim().toUpperCase();

    if (!trimmedName) {
      setError('Please enter a display name so others can recognize you.');
      return;
    }

    if (!trimmedCode || trimmedCode.length !== 6) {
      setError('Please enter a valid 6-character room code.');
      return;
    }

    setIsLoading(true);
    try {
      // Validate that the room actually exists on the backend first
      await roomService.getRoomDetails(trimmedCode);
      
      // Save display name to sessionStorage/localStorage so it can be picked up by the room workspace
      sessionStorage.setItem(`username_${trimmedCode}`, trimmedName);
      
      // Redirect directly to the live editor room workspace!
      router.push(`/room/${trimmedCode}`);
    } catch (err: any) {
      console.error('Room validation failed:', err);
      setError('Room not found. Make sure the code is correct and the room is active.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md p-8 rounded-xl bg-brand-bg-sec/45 border border-brand-border glassmorphism shadow-[0_0_50px_rgba(11,15,20,0.8)] flex flex-col gap-6"
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue border border-brand-blue/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Users size={24} />
        </div>
        <h2 className="text-xl font-bold font-space-grotesk tracking-wide text-brand-primary uppercase mt-2">
          Join Coding Session
        </h2>
        <p className="text-xs text-brand-secondary">
          Enter your display name and the 6-character code to join the synchronized editor workspace.
        </p>
      </div>

      {/* Error display */}
      {error ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3.5 bg-red-950/20 border border-red-500/35 rounded-lg text-red-400 text-xs flex items-start gap-2"
        >
          <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      ) : null}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Your Display Name"
          placeholder="e.g. Adarsh Jha"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          maxLength={20}
          className="capitalize font-semibold text-brand-primary"
        />

        <Input
          label="6-Digit Room Code"
          placeholder="e.g. A1B2C3"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          required
          maxLength={6}
          className="uppercase tracking-widest font-jetbrains-mono font-bold text-center text-brand-blue"
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="mt-2 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)] flex items-center gap-1.5 py-3"
        >
          Connect to Room
          <ArrowRight size={16} />
        </Button>
      </form>
    </motion.div>
  );
}

export default function JoinRoomPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-primary">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 relative">
        {/* Glow Backgrounds */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center text-brand-secondary gap-3">
              <svg className="animate-spin h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-widest font-space-grotesk animate-pulse">
                Preparing Gateway...
              </span>
            </div>
          }
        >
          <JoinRoomForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
