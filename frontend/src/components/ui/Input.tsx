import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label ? (
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
            {label}
          </label>
        ) : null}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full px-4 py-3 bg-brand-bg-sec/45 border rounded-lg text-sm text-brand-primary placeholder:text-brand-secondary/40 focus:outline-none transition-all duration-200 glassmorphism ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                : 'border-brand-border focus:border-brand-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]'
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-xs text-red-400 font-medium">
            {error}
          </span>
        ) : helperText ? (
          <span className="text-xs text-brand-secondary/70">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
