import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActiveUser {
  name: string;
  color: string;
}

interface UserPresenceProps {
  activeUsers: ActiveUser[];
}

export const UserPresence: React.FC<UserPresenceProps> = ({ activeUsers }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2.5 overflow-hidden">
        <AnimatePresence>
          {activeUsers.map((user, idx) => (
            <motion.div
              key={user.name + idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`w-8 h-8 rounded-full border-2 border-brand-bg flex items-center justify-center font-bold text-[10px] text-white uppercase shadow-md relative group cursor-help ${user.color}`}
            >
              {getInitials(user.name)}

              {/* Status active pulse */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-green border-2 border-brand-bg rounded-full shadow-[0_0_8px_#22C55E]" />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                <div className="px-2 py-1 text-[10px] text-brand-primary bg-brand-surface border border-brand-border rounded shadow-lg whitespace-nowrap uppercase tracking-wider font-semibold font-inter">
                  {user.name} (Active)
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <span className="text-[10px] text-brand-secondary ml-1 bg-brand-bg-sec/55 px-2 py-1 rounded border border-brand-border/60 font-semibold tracking-wider uppercase">
        {activeUsers.length} Online
      </span>
    </div>
  );
};

export default UserPresence;
