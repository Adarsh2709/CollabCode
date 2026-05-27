'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Terminal, Loader2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
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
      // Sort rooms so that newest rooms appear first
      setRooms(list.reverse());
    } catch (err: any) {
      console.error('Error fetching rooms:', err);
      setError('Could not fetch active rooms. Make sure the Spring Boot backend is running and connected.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    setIsCreating(true);
    setError(null);
    try {
      const newRoom = await roomService.createRoom();
      // Redirect to join room portal passing the created roomId
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Glow Effects */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight font-space-grotesk text-brand-primary flex items-center gap-2 uppercase">
              <Terminal size={22} className="text-brand-blue" />
              Workspace Dashboard
            </h1>
            <p className="text-xs text-brand-secondary">
              Deploy a new collaborative workspace or join any of the active synchronized coding sessions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={fetchRooms}
              disabled={isLoading}
              className="gap-1.5 cursor-pointer text-xs py-2 px-4"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
              Reload List
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateRoom}
              isLoading={isCreating}
              className="gap-1.5 cursor-pointer text-xs py-2.5 px-5 shadow-[0_0_15px_rgba(59,130,246,0.25)] font-semibold"
            >
              <Plus size={15} />
              Deploy New Room
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-950/20 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 max-w-3xl"
          >
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1.5">
              <span className="font-bold uppercase tracking-wider">Connection Failure</span>
              <span>{error}</span>
              <Button size="sm" variant="ghost" onClick={fetchRooms} className="self-start text-xs p-0 text-red-300 hover:text-red-200 mt-1 cursor-pointer">
                Try Re-connecting
              </Button>
            </div>
          </motion.div>
        ) : null}

        {/* Rooms List Grid */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-brand-secondary gap-3">
            <Loader2 size={36} className="animate-spin text-brand-blue" />
            <span className="text-xs font-semibold uppercase tracking-widest font-space-grotesk animate-pulse">
              Retrieving Active Rooms...
            </span>
          </div>
        ) : rooms.length === 0 && !error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-10 border border-dashed border-brand-border/60 rounded-xl bg-brand-bg-sec/10 py-20 max-w-3xl mx-auto w-full gap-4"
          >
            <div className="p-4 bg-brand-blue/5 rounded-full text-brand-blue border border-brand-blue/15 animate-bounce">
              <Sparkles size={28} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold text-brand-primary uppercase tracking-wide">
                No Active Sessions
              </h3>
              <p className="text-xs text-brand-secondary max-w-sm leading-relaxed">
                There are no coding rooms currently active in MongoDB. Create a brand new workspace to start pair programming.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleCreateRoom}
              isLoading={isCreating}
              className="mt-2 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)]"
            >
              Deploy First Room
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room.roomId}
                room={room}
                onJoin={handleJoinRoom}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
