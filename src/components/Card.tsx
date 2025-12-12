import React from "react";
import { motion } from "framer-motion";

interface GameProps {
  title: string;
  imageSrc?: string;
  videoSrc?: string;
  onClick?: () => void;
}

const GameCard: React.FC<GameProps> = ({
  title,
  imageSrc,
  videoSrc,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type:"spring", stiffness: 300, damping: 15 }}
      className="
        flex flex-col items-center justify-between 
        bg-white/10 backdrop-blur-md 
        border border-white/20 
        rounded-2xl overflow-hidden
        transition duration-100 ease-in-out 
        shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]
        withd-20 height-56
      "
    >
      
      <div className="flex-1 w-full overflow-hidden">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </motion.button>
  );
};

export default GameCard;