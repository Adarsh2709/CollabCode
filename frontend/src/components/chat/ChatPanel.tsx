import React, { useEffect, useRef } from 'react';
import { MessageSquare, HeartHandshake } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/ChatMessage';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatPanelProps {
  messages: ChatMessageType[];
  onSendMessage: (content: string) => void;
  senderName: string;
  isConnected?: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  senderName,
  isConnected = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col bg-brand-bg-sec/15 rounded-lg border border-brand-border overflow-hidden glassmorphism">
      {/* Panel Header */}
      <div className="px-4 py-3 bg-brand-bg-sec/55 border-b border-brand-border flex items-center gap-2">
        <MessageSquare size={16} className="text-brand-blue" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-primary">
          Live Room Chat
        </h4>
        <span className={`w-2 h-2 rounded-full ml-auto ${isConnected ? 'bg-brand-green shadow-[0_0_8px_#22C55E]' : 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.5)]'}`} />
      </div>

      {/* Message History List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-brand-secondary/40 gap-3">
            <HeartHandshake size={32} className="stroke-[1.5]" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary/60">
                Welcome to the Room!
              </span>
              <span className="text-[10px]">
                No messages yet. Say hello to get started with real-time collaboration.
              </span>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={msg.id || index}
              message={msg}
              isMe={msg.sender === senderName}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controller */}
      <ChatInput onSendMessage={onSendMessage} disabled={!isConnected} />
    </div>
  );
};

export default ChatPanel;
