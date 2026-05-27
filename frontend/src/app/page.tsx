'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, Users, Code, RefreshCw, Sparkles, ArrowRight, Play, Server, Database } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import FeatureCard from '../components/cards/FeatureCard';
import StatCard from '../components/cards/StatCard';

const TYPEWRITER_PHRASES = [
  'real-time collaborative coding.',
  'seamless developer interviews.',
  'instant pair programming.',
  'collaborative debugging.'
];

export default function LandingPage() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = TYPEWRITER_PHRASES[phraseIdx];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentPhrase.substring(0, displayText.length - 1)
            : currentPhrase.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />

        {/* Tiny tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <Sparkles size={11} />
          VS Code Live Share Redefined
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-space-grotesk max-w-4xl leading-[1.1] mb-6"
        >
          The premium workspace for<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-brand-green cursor-blink">
            {displayText}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-brand-secondary max-w-2xl leading-relaxed mb-10"
        >
          CollabCode is a real-time collaborative code editor that lets teams code simultaneously, chat live, and sync workspaces instantly. Enhance your coding interviews, pair programming, and remote training sessions.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 justify-center"
        >
          <Link href="/create-room">
            <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 font-semibold text-sm cursor-pointer py-3.5 px-6">
              Create Coding Room
              <ArrowRight size={16} />
            </Button>
          </Link>

          <Link href="/join-room">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 font-semibold text-sm cursor-pointer py-3.5 px-6 border-brand-border hover:border-brand-blue/30">
              Join Active Room
            </Button>
          </Link>
        </motion.div>

        {/* Live animated Terminal showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
          className="w-full max-w-4xl rounded-xl border border-brand-border bg-brand-bg-sec/45 overflow-hidden shadow-[0_0_50px_rgba(11,15,20,0.8)] glassmorphism terminal-glow text-left flex flex-col"
        >
          {/* Mac window controls */}
          <div className="px-5 py-3.5 border-b border-brand-border bg-brand-bg-sec flex items-center justify-between">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-bold text-brand-secondary/60 tracking-wider uppercase font-space-grotesk">
              collabcode-terminal.sh
            </span>
            <div className="w-12" />
          </div>

          {/* Terminal log output */}
          <div className="p-6 font-jetbrains-mono text-xs sm:text-sm text-brand-secondary space-y-4 leading-relaxed bg-brand-bg/75">
            <div>
              <span className="text-brand-green">$</span> create-room --lang=javascript
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-brand-blue flex items-center gap-1.5 font-semibold"
            >
              ✓ Coding Room Successfully Generated! RoomCode: <span className="text-brand-primary bg-brand-blue/10 px-1.5 py-0.5 rounded border border-brand-blue/20">A1B2C3</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <span className="text-brand-green">$</span> invite-developers --room=A1B2C3
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="text-brand-green flex items-center gap-1.5 font-semibold"
            >
              ✓ 3 Remote Developers Connected into Active Session
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8 }}
            >
              <span className="text-brand-green">$</span> start-collaboration --live
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.6 }}
              className="text-brand-primary flex items-center gap-2 font-bold animate-pulse"
            >
              <span className="w-2.5 h-2.5 bg-brand-green rounded-full shadow-[0_0_8px_#22C55E]" />
              WebSocket Active | Real-Time Sync Syncing Characters...
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-brand-border/40">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold font-space-grotesk text-brand-primary tracking-tight mb-4">
            Engineered for Modern Developers
          </h2>
          <p className="text-sm text-brand-secondary">
            CollabCode packages everything you need for efficient group coding, pair programming, and remote tech assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="RefreshCw"
            title="Real-Time Character Sync"
            description="Character-by-character synchronization using optimized WebSocket channels. Edit simultaneously without delays."
            glowColor="blue"
          />
          <FeatureCard
            icon="Code"
            title="Monaco Editor Core"
            description="The exact same coding engine that powers VS Code. Enjoy rich auto-completion, bracket pairing, and maps."
            glowColor="green"
          />
          <FeatureCard
            icon="Users"
            title="Live Developer Chat"
            description="Discuss problems, share links, and coordinate room activity directly within the platform using our real-time messaging panel."
            glowColor="orange"
          />
          <FeatureCard
            icon="Database"
            title="MongoDB Persistence"
            description="No lost codes. All sessions and rooms are backed up persistently in MongoDB Atlas, making sharing incredibly easy."
            glowColor="green"
          />
          <FeatureCard
            icon="Server"
            title="Spring STOMP WebSockets"
            description="Robust WebSocket infrastructure backed by Spring Boot messaging broker, ensuring optimal connection resilience."
            glowColor="blue"
          />
          <FeatureCard
            icon="Sparkles"
            title="Sleek Dark Theme"
            description="Beautiful terminal aesthetics crafted for late-night programming sessions. Cyberpunk design, zero eye strain."
            glowColor="orange"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-brand-border/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            value="10,000+"
            label="Rooms Created"
            subText="SaaS scale persistence"
            glowColor="blue"
          />
          <StatCard
            value="5,200+"
            label="Active Sessions"
            subText="Concurrent live editors"
            glowColor="green"
          />
          <StatCard
            value="1.5M+"
            label="Sync Actions"
            subText="Live updates broadcasted"
            glowColor="orange"
          />
          <StatCard
            value="45,000+"
            label="Developers Connected"
            subText="Globally distributed teams"
            glowColor="blue"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
