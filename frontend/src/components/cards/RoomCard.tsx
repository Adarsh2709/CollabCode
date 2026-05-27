import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Users, Calendar, ArrowRight } from 'lucide-react';
import { Room } from '../../types/Room';
import Button from '../ui/Button';

interface RoomCardProps {
  room: Room;
  onJoin: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onJoin }) => {
  // Format dates
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Just now';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'typescript':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'java':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'python':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default:
        return 'text-brand-blue bg-brand-blue/10 border-brand-blue/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 rounded-xl bg-brand-bg-sec/25 border border-brand-border glassmorphism hover:border-brand-blue/45 hover:shadow-[0_0_25px_rgba(59,130,246,0.06)] transition-all duration-300 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue border border-brand-blue/20">
            <Terminal size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-brand-primary tracking-wide uppercase">
              Room {room.roomId}
            </h4>
            <span className="text-[10px] text-brand-secondary/70">
              ID: {room.id?.substring(0, 10) || 'Local'}...
            </span>
          </div>
        </div>
        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border ${getLanguageColor(room.language)}`}>
          {room.language}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-xs text-brand-secondary border-y border-brand-border/60 py-3 my-1">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-brand-secondary/60" />
          <span>{formatDate(room.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <Code size={13} className="text-brand-secondary/60" />
          <span className="font-jetbrains-mono text-[10px] text-brand-green">Active Synchronized</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full border-2 border-brand-bg bg-brand-blue text-[9px] flex items-center justify-center font-bold text-white uppercase shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            D1
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-brand-bg bg-brand-green text-[9px] flex items-center justify-center font-bold text-white uppercase shadow-[0_0_10px_rgba(34,197,94,0.2)]">
            D2
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onJoin(room.roomId)}
          className="text-xs hover:text-white font-medium flex items-center gap-1 cursor-pointer group"
        >
          Join Room
          <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
