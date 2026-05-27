import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  subText?: string;
  glowColor?: 'blue' | 'green' | 'orange';
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  subText,
  glowColor = 'blue',
}) => {
  const glows = {
    blue: 'border-brand-border hover:border-brand-blue/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]',
    green: 'border-brand-border hover:border-brand-green/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.06)]',
    orange: 'border-brand-border hover:border-brand-orange/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]',
  };

  const textColors = {
    blue: 'text-brand-blue',
    green: 'text-brand-green',
    orange: 'text-brand-orange',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl bg-brand-bg-sec/15 border glassmorphism transition-all duration-300 flex flex-col gap-1 ${glows[glowColor]}`}
    >
      <span className={`text-3xl lg:text-4xl font-bold tracking-tight font-space-grotesk ${textColors[glowColor]}`}>
        {value}
      </span>
      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-primary mt-1">
        {label}
      </h4>
      {subText ? (
        <span className="text-[10px] text-brand-secondary/60">
          {subText}
        </span>
      ) : null}
    </motion.div>
  );
};

export default StatCard;
