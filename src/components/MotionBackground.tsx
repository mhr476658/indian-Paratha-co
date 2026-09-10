import React from 'react';
import { VideoBackground } from './VideoBackground';
import { AttractiveHighwayBackground } from './AttractiveHighwayBackground';

/**
 * Premium Cinematic Video & Motion Background
 * Features active HTML5 video loops of sizzling cast-iron tawas,
 * rustic chalet ambience, floating spice embers, and interactive video controls.
 */
export const MotionBackground: React.FC = () => {
  return (
    <>
      <VideoBackground opacity={0.42} />
      <AttractiveHighwayBackground />
    </>
  );
};
