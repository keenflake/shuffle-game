import { motion } from 'framer-motion';
import { FC, useCallback } from 'react';

import { GameState } from '../../constants';
import { Icon } from '../icon';

export interface PrizeCardProps {
  prize: string;
  state: GameState;
  animationDuration: number;
  winning: boolean;
  onPick: (prize: string) => void;
}

const getRotationAngle = (state: GameState, winning: boolean): number => {
  if (state === GameState.Start) {
    return 0;
  }

  if (state === GameState.UserPicks) {
    return 180;
  }

  if (state === GameState.Done && winning) {
    return 0;
  }

  return 180;
};

export const PrizeCard: FC<PrizeCardProps> = ({ prize, state, animationDuration, winning, onPick }) => {
  return (
    <div className="h-64" style={{ perspective: 1500 }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: getRotationAngle(state, winning) }}
        transition={{ duration: animationDuration }}
      >
        <p
          className="flex items-center justify-center absolute inset-0 rounded-lg bg-white shadow-md text-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {prize}
        </p>

        <button
          type="button"
          className="flex items-center justify-center absolute inset-0 rounded-lg bg-white shadow-md"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          onClick={() => onPick(prize)}
        >
          <Icon kind="question_mark" className="w-20 text-dark-teal" />
        </button>
      </motion.div>
    </div>
  );
};
