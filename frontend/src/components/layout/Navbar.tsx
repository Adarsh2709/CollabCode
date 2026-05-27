import React from 'react';
import Link from 'next/link';
import { Plus, LogIn } from 'lucide-react';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-bg/60 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <Logo size={28} />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-brand-secondary">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/create-room" className="hover:text-white transition-colors">
            Rooms
          </Link>
          <a href="https://github.com/Adarsh2709/CollabCode" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            Documentation
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/join-room">
            <Button size="sm" variant="ghost" className="hidden sm:inline-flex gap-1.5 cursor-pointer">
              <LogIn size={15} />
              Join Room
            </Button>
          </Link>
          
          <Link href="/create-room">
            <Button size="sm" variant="primary" className="gap-1.5 cursor-pointer">
              <Plus size={15} />
              New Room
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
