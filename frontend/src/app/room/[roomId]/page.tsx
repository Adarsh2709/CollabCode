'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Users, Play, Save, Wifi, Loader2, Sparkles, MessageSquare, AlertCircle, LogOut } from 'lucide-react';
import RoomHeader from '../../../components/editor/RoomHeader';
import MonacoEditor from '../../../components/editor/MonacoEditor';
import ChatPanel from '../../../components/chat/ChatPanel';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useRoom } from '../../../hooks/useRoom';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { ChatMessage } from '../../../types/ChatMessage';

const USER_COLORS = [
  'bg-blue-600',
  'bg-green-600',
  'bg-amber-600',
  'bg-purple-600',
  'bg-pink-600',
  'bg-cyan-600',
];

export default function RoomWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId as string;

  // Local state
  const [username, setUsername] = useState<string>('');
  const [tempUsername, setTempUsername] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [code, setCode] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [customActiveUsers, setCustomActiveUsers] = useState<{ name: string; color: string }[]>([]);

  // REST Hook
  const { room, setRoom, isLoading, error, isSaving, saveCode } = useRoom(roomId);

  // Retrieve user color
  const userColor = useMemo(() => {
    const randomIdx = Math.floor(Math.random() * USER_COLORS.length);
    return USER_COLORS[randomIdx];
  }, []);

  // Check display name on mount
  useEffect(() => {
    const storedName = sessionStorage.getItem(`username_${roomId}`);
    if (storedName) {
      setUsername(storedName);
      setCustomActiveUsers([{ name: storedName, color: userColor }]);
    } else {
      setShowNameModal(true);
    }
  }, [roomId, userColor]);

  // Initial code set from REST details
  useEffect(() => {
    if (room && room.code !== undefined && code === '') {
      setCode(room.code);
    }
  }, [room, code]);

  // WebSocket Callbacks
  const handleCodeReceived = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const handleChatReceived = useCallback((message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message]);

    // Dynamically register sender presence if not already in the online developers tray!
    setCustomActiveUsers((prev) => {
      if (prev.some((u) => u.name.toLowerCase() === message.sender.toLowerCase())) {
        return prev;
      }
      const randomColor = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
      return [...prev, { name: message.sender, color: randomColor }];
    });
  }, []);

  // WS Sync Hook
  const { isConnected, connectionStatus, sendCode, sendChat } = useWebSocket({
    roomId,
    senderName: username || 'Guest',
    onCodeReceived: handleCodeReceived,
    onChatReceived: handleChatReceived,
  });

  // Handle local user editor typing
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (isConnected) {
      sendCode(newCode);
    }
  };

  // Debounced auto-save to MongoDB
  useEffect(() => {
    if (!roomId || code === '' || room?.code === code) return;

    const timer = setTimeout(() => {
      saveCode(code);
    }, 3000); // Trigger auto-save to MongoDB Atlas after 3 seconds of typing idle

    return () => clearTimeout(timer);
  }, [code, roomId, saveCode, room?.code]);

  // Language changer REST update
  const handleLanguageChange = async (newLang: string) => {
    if (!room) return;
    try {
      const updated = { ...room, language: newLang };
      setRoom(updated);
      // Save details
      await saveCode(code);
    } catch (err) {
      console.error('Error changing language:', err);
    }
  };

  // Chat sender
  const handleSendChatMessage = (content: string) => {
    sendChat(content);
  };

  // Modal Name submit
  const handleNameModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tempUsername.trim();
    if (!trimmed) return;

    sessionStorage.setItem(`username_${roomId}`, trimmed);
    setUsername(trimmed);
    setCustomActiveUsers([{ name: trimmed, color: userColor }]);
    setShowNameModal(false);
  };

  if (isLoading && !room) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-brand-secondary gap-3">
        <Loader2 size={42} className="animate-spin text-brand-blue" />
        <span className="text-sm font-semibold uppercase tracking-widest font-space-grotesk animate-pulse">
          Establishing workspace sync...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-xl border border-red-500/20 bg-brand-bg-sec/45 glassmorphism flex flex-col items-center gap-4"
        >
          <div className="p-3 bg-red-500/10 text-red-500 rounded-full border border-red-500/15">
            <AlertCircle size={28} />
          </div>
          <h3 className="text-lg font-bold font-space-grotesk text-brand-primary uppercase">
            Workspace Broken
          </h3>
          <p className="text-xs text-brand-secondary leading-relaxed">
            {error}
          </p>
          <Button variant="primary" onClick={() => router.push('/create-room')} className="mt-2 font-semibold">
            Return to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-brand-bg overflow-hidden text-brand-primary">
      {/* Top Header */}
      {room && (
        <RoomHeader
          roomId={roomId}
          activeUsers={customActiveUsers}
          currentLanguage={room.language}
          onLanguageChange={handleLanguageChange}
          isSaving={isSaving}
        />
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-3 gap-3">
        {/* Left Side: Monaco Code Editor */}
        <div className="flex-1 h-[55%] lg:h-full flex flex-col">
          {room && (
            <MonacoEditor
              value={code}
              language={room.language}
              onChange={handleCodeChange}
            />
          )}
        </div>

        {/* Right Side: Chat & Users Panels */}
        <div className="w-full lg:w-[360px] h-[45%] lg:h-full flex flex-col gap-3 flex-shrink-0">
          <ChatPanel
            messages={chatMessages}
            onSendMessage={handleSendChatMessage}
            senderName={username}
            isConnected={isConnected}
          />
        </div>
      </div>

      {/* Connection & Status Footer */}
      <div className="h-10 border-t border-brand-border bg-brand-bg-sec/55 px-4 flex items-center justify-between text-[10px] text-brand-secondary font-jetbrains-mono tracking-wider uppercase flex-shrink-0">
        <div className="flex items-center gap-2">
          <Wifi size={12} className="text-brand-blue" />
          <span>Sync Gateway: </span>
          <span className="flex items-center gap-1.5 font-bold">
            <span className={`w-2 h-2 rounded-full ${
              connectionStatus === 'CONNECTED' ? 'bg-brand-green shadow-[0_0_8px_#22C55E]' :
              connectionStatus === 'CONNECTING' ? 'bg-brand-orange animate-pulse shadow-[0_0_8px_#F59E0B]' :
              'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.5)]'
            }`} />
            {connectionStatus}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => saveCode(code)}
            disabled={isSaving}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
          >
            <Save size={12} />
            Manual Backup
          </button>
          <span>|</span>
          <span className="text-[10px] text-brand-secondary/60">
            JetBrains Mono 14px
          </span>
        </div>
      </div>

      {/* Display Name prompt modal overlay (if joined via sharing directly) */}
      <AnimatePresence>
        {showNameModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-md z-10 p-8 rounded-xl glassmorphism border border-brand-border bg-brand-bg-sec/45 shadow-[0_0_50px_rgba(11,15,20,0.8)] flex flex-col gap-6"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue border border-brand-blue/20">
                  <Terminal size={22} />
                </div>
                <h3 className="text-lg font-bold font-space-grotesk tracking-wide text-brand-primary uppercase mt-2">
                  Welcome to Room {roomId}!
                </h3>
                <p className="text-xs text-brand-secondary leading-relaxed">
                  You joined this coding room directly. Enter a display name so other developers in the session can see who you are.
                </p>
              </div>

              <form onSubmit={handleNameModalSubmit} className="flex flex-col gap-4">
                <Input
                  label="Enter Your Name"
                  placeholder="e.g. Adarsh"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  required
                  maxLength={20}
                  className="capitalize font-semibold text-brand-primary"
                />
                <Button
                  type="submit"
                  fullWidth
                  className="font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)] py-2.5"
                >
                  Enter Workspace
                </Button>
              </form>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
