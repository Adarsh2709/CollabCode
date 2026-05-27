import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    onSendMessage(message.trim());
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-brand-border bg-brand-bg-sec/55 flex items-center gap-2 glassmorphism"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? 'Connecting to chat...' : 'Type a message...'}
        className="flex-1 px-4 py-2.5 bg-brand-bg/75 border border-brand-border focus:border-brand-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] rounded-lg text-xs text-brand-primary placeholder:text-brand-secondary/40 focus:outline-none transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="p-2.5 rounded-lg bg-brand-blue hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-150 cursor-pointer"
      >
        <Send size={14} />
      </button>
    </form>
  );
};

export default ChatInput;
