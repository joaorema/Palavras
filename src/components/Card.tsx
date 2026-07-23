import React from "react";
import { motion } from "framer-motion";

interface GameProps {
  title: string;
  description: string;
  meta: string;
  imageSrc?: string;
  videoSrc?: string;
  tone?: string;
  onClick?: () => void;
}

const GameCard: React.FC<GameProps> = ({
  title,
  description,
  meta,
  imageSrc,
  videoSrc,
  tone = "wordle",
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`game-card game-card-${tone}`}
      aria-label={`Jogar ${title}`}
    >
      <div className="game-card-preview" aria-hidden="true">
        {videoSrc ? (
          <video src={videoSrc} autoPlay loop muted playsInline />
        ) : imageSrc ? (
          <img src={imageSrc} alt={title} />
        ) : (
          <div className="game-card-fallback" />
        )}
      </div>

      <div className="game-card-copy">
        <span className="game-card-meta">{meta}</span>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <span className="game-card-action">Jogar</span>
    </motion.button>
  );
};

export default GameCard;
