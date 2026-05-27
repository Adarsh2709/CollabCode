import React, { useState } from 'react';
import { Share2, Check, Copy, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '../ui/Button';
import LanguageSelector from './LanguageSelector';
import UserPresence from './UserPresence';

interface ActiveUser {
  name: string;
  color: string;
}

interface RoomHeaderProps {
  roomId: string;
  activeUsers: ActiveUser[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  isSaving?: boolean;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({
  roomId,
  activeUsers,
  currentLanguage,
  onLanguageChange,
  isSaving = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    try {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  return (
    <div className="w-full h-16 border-b border-brand-border bg-brand-bg-sec/45 px-4 sm:px-6 flex items-center justify-between gap-4 glassmorphism">
      {/* Left section: Return and Title */}
      <div className="flex items-center gap-3">
        <Link href="/create-room">
          <button className="p-2 text-brand-secondary hover:text-white hover:bg-brand-border/40 rounded-lg transition-colors cursor-pointer">
            <ArrowLeft size={16} />
          </button>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-space-grotesk font-bold text-sm tracking-wide text-brand-primary uppercase">
            Room Code: <span className="text-brand-blue">{roomId}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyLink}
              className="p-1 rounded text-brand-secondary hover:text-brand-blue hover:bg-brand-blue/5 transition-colors cursor-pointer"
              title="Copy Share Link"
            >
              {copied ? <Check size={12} className="text-brand-green" /> : <Copy size={12} />}
            </button>
            {isSaving ? (
              <span className="text-[10px] bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-1.5 py-0.5 rounded font-jetbrains-mono font-medium animate-pulse">
                Saving...
              </span>
            ) : (
              <span className="text-[10px] bg-brand-green/10 border border-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-jetbrains-mono font-medium">
                Saved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Middle section: User Presence (Hidden on mobile) */}
      <div className="hidden md:block">
        <UserPresence activeUsers={activeUsers} />
      </div>

      {/* Right section: Language & Sharing */}
      <div className="flex items-center gap-3">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
        
        <Button
          size="sm"
          variant="secondary"
          className="gap-1.5 cursor-pointer font-semibold shadow-[0_0_15px_rgba(42,52,65,0.2)] text-xs py-2"
          onClick={handleCopyLink}
        >
          <Share2 size={13} className="text-brand-blue" />
          {copied ? 'Copied' : 'Share'}
        </Button>
      </div>
    </div>
  );
};

export default RoomHeader;
