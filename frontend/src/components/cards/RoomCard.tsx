import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Calendar, ArrowRight, Activity } from 'lucide-react';
import { Room } from '../../types/Room';

interface RoomCardProps {
  room: Room;
  onJoin: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onJoin }) => {
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

  const getLangColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript': return { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/8' };
      case 'typescript': return { text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/8' };
      case 'java': return { text: 'text-brand-orange', border: 'border-brand-orange/30', bg: 'bg-brand-orange/8' };
      case 'python': return { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/8' };
      default: return { text: 'text-brand-blue', border: 'border-brand-blue/30', bg: 'bg-brand-blue/8' };
    }
  };

  const lang = getLangColor(room.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="tactical-card corner-bracket p-5 flex flex-col gap-4 group"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-blue/8 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0">
            <Terminal size={15} />
          </div>
          <div>
            <h4 className="font-space-grotesk text-sm font-black tracking-widest text-brand-primary uppercase">
              {room.roomId}
            </h4>
            <span className="font-jetbrains-mono text-[9px] text-brand-secondary/40 tracking-wider">
              {room.id ? `ID: ${room.id.substring(0, 12)}...` : 'LOCAL_INSTANCE'}
            </span>
          </div>
        </div>

        {/* Language badge */}
        <span className={`font-jetbrains-mono text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 border ${lang.text} ${lang.border} ${lang.bg} flex-shrink-0`}>
          {room.language}
        </span>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 gap-3 border-t border-b border-brand-border/40 py-3">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-brand-secondary/40" />
          <span className="font-jetbrains-mono text-[9px] text-brand-secondary/50 tracking-wide">
            {formatDate(room.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse shadow-[0_0_6px_#22C55E]" />
          <span className="font-jetbrains-mono text-[9px] text-brand-green tracking-wider font-bold">
            LIVE
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity size={11} className="text-brand-secondary/40" />
          <span className="font-jetbrains-mono text-[9px] text-brand-secondary/40 tracking-wider uppercase">
            Synchronized
          </span>
        </div>

        <button
          onClick={() => onJoin(room.roomId)}
          className="inline-flex items-center gap-1.5 font-jetbrains-mono text-[10px] font-bold tracking-[0.12em] uppercase text-brand-secondary hover:text-brand-primary border border-brand-border/60 hover:border-brand-blue/50 hover:bg-brand-blue/5 px-3 py-1.5 transition-all duration-150 group-hover:border-brand-blue/40"
        >
          JOIN
          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
