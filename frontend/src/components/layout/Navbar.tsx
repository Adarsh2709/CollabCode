'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, LogIn } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/create-room', label: 'Rooms' },
    { href: 'https://github.com/Adarsh2709/CollabCode', label: 'Documentation', external: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-brand-border bg-brand-bg/90 backdrop-blur-md'
          : 'border-b border-brand-border/40 bg-brand-bg/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <Logo size={28} />
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-brand-secondary">
          {navLinks.map(({ href, label, external }) => {
            const isActive = !external && pathname === href;
            return external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-150 text-sm"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className={`transition-colors duration-150 text-sm ${
                  isActive ? 'text-brand-blue font-semibold' : 'hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/join-room">
            <button className="hidden sm:inline-flex items-center gap-1.5 border border-brand-border/60 hover:border-brand-border text-brand-secondary hover:text-brand-primary text-xs font-medium px-3 py-1.5 transition-all duration-150 bg-transparent">
              <LogIn size={13} />
              Join Room
            </button>
          </Link>

          <Link href="/create-room">
            <button className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 transition-all duration-150 shadow-[0_0_14px_rgba(59,130,246,0.25)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Plus size={13} />
              New Room
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
