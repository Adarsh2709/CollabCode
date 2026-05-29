'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckSquare, Terminal, Code, Layers, MessageSquare, Play, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const TYPEWRITER_PHRASES = [
  'REAL-TIME SYNC.',
  'PAIR PROGRAMMING.',
  'REMOTE CODE LOBBIES.',
  'COLLABORATIVE WORKSPACES.',
];

const CARDS = [
  {
    id: 'COLLAB-01',
    issueIcon: ShieldAlert,
    issueTitle: 'DISCONNECTED_TEAMS',
    issueDesc:
      'Remote development groups losing hours copy-pasting code blocks across messaging boards and waiting for screen shares to refresh.',
    fixIcon: CheckSquare,
    fixTitle: 'REALTIME_SYNCHRONIZATION',
    fixDesc:
      'Dynamic low-latency WebSocket mirroring to synchronize character-by-character coding blocks instantly across any connection.',
    cardClass: 'tactical-card',
    tagColor: 'text-brand-blue/50',
  },
  {
    id: 'COLLAB-02',
    issueIcon: Terminal,
    issueTitle: 'ENVIRONMENT_MISMATCH',
    issueDesc:
      'Developers wasting up to 30% of pair coding sessions debugging missing local packages, environment variables, and compilation mismatches.',
    fixIcon: Code,
    fixTitle: 'INTEGRATED_MONACO_CORE',
    fixDesc:
      'Deploying cloud-hosted Monaco editor cores instantly within the browser, pre-configured with active dark compiler options.',
    cardClass: 'tactical-card tactical-card-green',
    tagColor: 'text-brand-green/50',
  },
  {
    id: 'COLLAB-03',
    issueIcon: Layers,
    issueTitle: 'CONTEXT_SWITCHING',
    issueDesc:
      'Constantly toggling between code editors and video calls breaking developer focus state and losing discussion logs.',
    fixIcon: MessageSquare,
    fixTitle: 'INTEGRATED_WORKSPACE_CHAT',
    fixDesc:
      'Embedded real-time messaging panel directly in the workspace tray to maintain flow state and keep room discussions contextual.',
    cardClass: 'tactical-card',
    tagColor: 'text-brand-blue/40',
    wide: true,
  },
];

export default function LandingPage() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = TYPEWRITER_PHRASES[phraseIdx];
    const typingSpeed = isDeleting ? 28 : 55;

    if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
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



      {/* ── Hero ── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col items-center text-center overflow-hidden">
        {/* Grid dot background */}
        <div className="absolute inset-0 grid-dots opacity-25 pointer-events-none" />
        {/* Blue glow blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-blue/5 blur-[140px] pointer-events-none" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 border border-brand-blue/25 bg-brand-blue/8 mb-8"
        >
          <Sparkles size={11} className="text-brand-blue" />
          <span className="font-jetbrains-mono text-[9px] font-bold tracking-[0.2em] text-brand-blue uppercase">
            WORKSPACE ENCRYPTION ACTIVE
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative z-10 mb-5"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-space-grotesk leading-[1.05]">
            TACTICAL LOBBY FOR
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight font-space-grotesk leading-[1.1] mt-1 cursor-blink">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-brand-green font-extrabold">
              {displayText}
            </span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 font-inter text-xs sm:text-sm text-brand-secondary/70 max-w-lg leading-relaxed mb-10"
        >
          Configure cloud-hosted synchronized editor rooms in 3 seconds. Mirror codebase
          directories instantly, communicate in active channels, and optimize remote
          developer workflows.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/create-room">
            <button className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-semibold text-sm tracking-wide uppercase px-6 py-3 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]">
              <Play size={13} className="fill-current" />
              Deploy Coding Workspace
            </button>
          </Link>
          <Link href="/join-room">
            <button className="inline-flex items-center gap-2 border border-brand-border hover:border-brand-secondary/40 text-brand-secondary hover:text-brand-primary font-semibold text-sm tracking-wide uppercase px-6 py-3 transition-all duration-200 bg-transparent">
              Connect to Active Room
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ── Situation Report ── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-brand-border/40">

        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-space-grotesk text-3xl sm:text-4xl font-black tracking-tight text-brand-primary leading-none">
            WHY{' '}
            <span className="font-light text-brand-secondary/35">COLLABCODE</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CARDS.map((card, i) => {
            const IssueIcon = card.issueIcon;
            const FixIcon = card.fixIcon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-7 corner-bracket ${card.cardClass} ${card.wide ? 'lg:col-span-2 max-w-3xl w-full mx-auto' : ''}`}
              >
                {/* Tag */}
                <span className={`absolute top-5 right-6 font-jetbrains-mono text-[10px] font-bold tracking-wider ${card.tagColor}`}>
                  [{card.id}]
                </span>

                {/* ── DETECTED ISSUE ── */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-950/25 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.1)]">
                    <IssueIcon size={18} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                      <span className="font-jetbrains-mono text-[9px] font-bold text-red-400 tracking-[0.18em] uppercase">
                        DETECTED_ISSUE
                      </span>
                    </div>
                    <h3 className="font-space-grotesk text-base font-black tracking-wide text-brand-primary uppercase">
                      {card.issueTitle}
                    </h3>
                    <p className="font-inter text-[11px] text-brand-secondary/70 leading-relaxed mt-0.5 max-w-md">
                      {card.issueDesc}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="connector-line my-3" />

                {/* ── PROPOSED FIX ── */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-green/8 border border-brand-green/20 flex items-center justify-center text-brand-green shadow-[0_0_12px_rgba(34,197,94,0.1)]">
                    <FixIcon size={18} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-jetbrains-mono text-[9px] font-bold text-brand-green tracking-[0.18em] uppercase">
                      PROPOSED_FIX
                    </span>
                    <h3 className="font-space-grotesk text-base font-black tracking-wide text-brand-primary uppercase">
                      {card.fixTitle}
                    </h3>
                    <p className="font-inter text-[11px] text-brand-secondary/70 leading-relaxed mt-0.5 max-w-md">
                      {card.fixDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Terminal Showcase ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center border-t border-brand-border/40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70 }}
          className="w-full max-w-3xl border border-brand-border bg-brand-bg-sec/50 overflow-hidden terminal-glow"
        >
          {/* Window chrome */}
          <div className="px-5 py-3 border-b border-brand-border bg-brand-bg-sec flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-jetbrains-mono text-[9px] font-semibold text-brand-secondary/40 tracking-widest uppercase">
              collabcode-terminal.sh
            </span>
            <div className="w-12" />
          </div>

          {/* Terminal body */}
          <div className="p-6 font-jetbrains-mono text-xs text-brand-secondary space-y-4 leading-relaxed bg-brand-bg/80">
            <div>
              <span className="text-brand-green">$</span>
              <span className="ml-2">create-room --lang=javascript</span>
            </div>
            <div className="text-brand-blue font-semibold flex items-center gap-2">
              ✓ Coding Room Generated! RoomCode:{' '}
              <span className="text-brand-primary bg-brand-blue/10 px-1.5 py-0.5 border border-brand-blue/20">
                A1B2C3
              </span>
            </div>

            <div>
              <span className="text-brand-green">$</span>
              <span className="ml-2">invite-developers --room=A1B2C3</span>
            </div>
            <div className="text-brand-green font-semibold">
              ✓ 3 Remote Developers Connected into Active Session
            </div>

            <div>
              <span className="text-brand-green">$</span>
              <span className="ml-2">start-collaboration --live</span>
            </div>
            <div className="text-brand-primary font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_6px_#22C55E]" />
              WebSocket Active | Real-Time Sync Running...
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
