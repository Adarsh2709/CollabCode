import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LogoIcon: React.FC<LogoProps> = ({ size = 32, className = '', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[0_0_8px_rgba(59,130,246,0.35)] ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="logo-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="logo-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Left Code Bracket Link (<) */}
      <path
        d="M 28 6 L 12 20 L 28 34 C 34 34 38 30 38 24 C 38 19.5 35 17.5 31 17.5 C 27 17.5 24 19.5 24 24"
        stroke="url(#logo-blue-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Code Bracket Link (>) */}
      <path
        d="M 44 34 L 60 20 L 44 6 C 38 6 34 10 34 16 C 34 20.5 37 22.5 41 22.5 C 45 22.5 48 20.5 48 16"
        stroke="url(#logo-green-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={size} />
      <span className="font-space-grotesk font-bold text-lg text-brand-primary tracking-wide">
        Collab<span className="text-brand-blue">Code</span>
      </span>
    </div>
  );
};

export default Logo;
