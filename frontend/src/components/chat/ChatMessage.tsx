import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '../../types/ChatMessage';

interface ChatMessageProps {
  message: ChatMessageType;
  isMe: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isMe }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-2.5 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-md flex-shrink-0 ${
        isMe ? 'bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-brand-orange shadow-[0_0_10px_rgba(245,158,11,0.3)]'
      }`}>
        {getInitials(message.sender)}
      </div>

      {/* Message Balloon */}
      <div className="flex flex-col gap-1">
        {/* Sender Name */}
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${isMe ? 'text-brand-blue text-right' : 'text-brand-orange'}`}>
          {isMe ? 'You' : message.sender}
        </span>

        {/* Bubble */}
        <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed border ${
          isMe 
            ? 'bg-brand-blue/10 border-brand-blue/35 rounded-tr-none text-brand-primary' 
            : 'bg-brand-bg-sec/55 border-brand-border rounded-tl-none text-brand-secondary/90'
        }`}>
          {message.content}
        </div>

        {/* Timestamp */}
        <span className={`text-[9px] text-brand-secondary/40 font-jetbrains-mono ${isMe ? 'text-right' : ''}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
