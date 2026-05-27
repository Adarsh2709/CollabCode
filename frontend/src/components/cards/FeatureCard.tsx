import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  icon: keyof typeof Icons;
  title: string;
  description: string;
  glowColor?: 'blue' | 'green' | 'orange';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  glowColor = 'blue',
}) => {
  const IconComponent = Icons[icon] as React.ComponentType<{ size?: number; className?: string }>;

  const glows = {
    blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] hover:border-brand-blue/30',
    green: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.08)] hover:border-brand-green/30',
    orange: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:border-brand-orange/30',
  };

  const iconColors = {
    blue: 'text-brand-blue bg-brand-blue/10 border border-brand-blue/20',
    green: 'text-brand-green bg-brand-green/10 border border-brand-green/20',
    orange: 'text-brand-orange bg-brand-orange/10 border border-brand-orange/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl bg-brand-bg-sec/30 border border-brand-border glassmorphism transition-all duration-300 flex flex-col items-start gap-4 ${glows[glowColor]}`}
    >
      <div className={`p-3 rounded-lg flex items-center justify-center ${iconColors[glowColor]}`}>
        {IconComponent ? <IconComponent size={20} /> : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <h4 className="text-base font-semibold text-brand-primary tracking-wide font-space-grotesk">
          {title}
        </h4>
        <p className="text-xs text-brand-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
