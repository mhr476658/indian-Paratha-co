import React from 'react';

/**
 * Static Background Replacement
 * Replaced heavy video loops and 3D canvas animations to improve performance.
 */
export const MotionBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#080D0A] via-[#0F1712] to-[#080D0A]" />
  );
};
