'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Terminal, Loader2, RefreshCw, AlertCircle, Activity } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import RoomCard from '../../components/cards/RoomCard';
import { Room } from '../../types/Room';
import { roomService } from '../../services/roomService';

export default function CreateRoomPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await roomService.getAllRooms();
      setRooms(list.reverse());
    } catch (err: any) {
      console.error('Error fetching rooms:', err);
      setError('Could not fetch active rooms. Make sure the Spring Boot backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    setIsCreating(true);
    setError(null);
    try {
      const newRoom = await roomService.createRoom();
      router.push(`/join-room?roomId=${newRoom.roomId}`);
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to deploy new room. Try again.');
      setIsCreating(false);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    router.push(`/join-room?roomId=${roomId}`);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-primary">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 relative">
        {/* Subtle glow */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-blue/3 blur-[120px] pointer-events-none" />

        {/* ── Dashboard Header ── */}
        <div className="flex flex-col gap-3 border-b border-brand-border/50 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-space-grotesk text-2xl font-black tracking-tight text-brand-primary flex items-center gap-3 uppercase">
                <Terminal size={20} className="text-brand-blue flex-shrink-0" />
                ACTIVE_SESSIONS
              </h1>
              <p className="font-inter text-xs text-brand-secondary/60 ml-8">
                Deploy a new collaborative workspace or connect to any active coding session.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={fetchRooms}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 border border-brand-border hover:border-brand-secondary/50 text-brand-secondary hover:text-brand-primary font-jetbrains-mono text-[10px] font-bold tracking-[0.12em] uppercase px-4 py-2 transition-all duration-150 disabled:opacity-40"
              >
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                RELOAD
              </button>

              <button
                onClick={handleCreateRoom}
                disabled={isCreating}
                className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-blue-500 text-white font-jetbrains-mono text-[10px] font-bold tracking-[0.12em] uppercase px-5 py-2 transition-all duration-150 shadow-[0_0_16px_rgba(59,130,246,0.25)] disabled:opacity-50"
              >
                {isCreating ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Plus size={12} />
                )}
                {isCreating ? 'CREATING...' : 'CREATE_ROOM'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Error State ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border border-red-500/30 bg-red-950/15 text-red-400 text-xs flex items-start gap-2.5 max-w-3xl"
          >
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1.5">
              <span className="font-jetbrains-mono font-bold text-[10px] uppercase tracking-widest">
                CONNECTION_FAILURE
              </span>
              <span className="font-inter text-brand-secondary/70">{error}</span>
              <button
                onClick={fetchRooms}
                className="self-start font-jetbrains-mono text-[10px] text-red-300 hover:text-red-200 uppercase tracking-widest mt-1 underline underline-offset-2"
              >
                RETRY_CONNECTION
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Room List States ── */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-brand-secondary gap-4">
            <Loader2 size={32} className="animate-spin text-brand-blue" />
            <span className="font-jetbrains-mono text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
              RETRIEVING_ACTIVE_ROOMS...
            </span>
          </div>
        ) : rooms.length === 0 && !error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-24 border border-dashed border-brand-border/50 max-w-2xl mx-auto w-full gap-5"
          >
            <div className="w-12 h-12 border border-brand-blue/20 bg-brand-blue/5 flex items-center justify-center text-brand-blue">
              <Activity size={22} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-space-grotesk text-base font-black text-brand-primary uppercase tracking-wide">
                NO_ACTIVE_SESSIONS
              </h3>
              <p className="font-inter text-xs text-brand-secondary/60 max-w-sm leading-relaxed">
                There are no coding rooms currently active. Create a brand new workspace to start pair programming.
              </p>
            </div>
            <button
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-jetbrains-mono text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 mt-2 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] disabled:opacity-50"
            >
              {isCreating ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              {isCreating ? 'CREATING...' : 'CREATE_FIRST_ROOM'}
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <RoomCard key={room.roomId} room={room} onJoin={handleJoinRoom} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
