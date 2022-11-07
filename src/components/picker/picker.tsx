import { shuffle } from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';

import { GameState } from '../../constants/game-state';
import { usePrizesStore } from '../../store';
import { Button } from '../button/button';
import { Container } from '../container';
import { PrizeCard } from '../prize-card';

const ANIMATION_DURATION = 0.75;

export const Picker: FC = () => {
  const prizes = usePrizesStore(state => state.prizes);

  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [shuffledPrizes, setShuffledPrizes] = useState(prizes);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  const resetState = useCallback((prizes: string[]) => {
    setGameState(GameState.Start);
    setShuffledPrizes(prizes);
    setWonPrize(null);
  }, []);

  const handlePlayClick = useCallback(() => {
    setGameState(GameState.UserPicks);

    setTimeout(() => {
      setShuffledPrizes(prizes => shuffle(prizes));
    }, ANIMATION_DURATION * 1000 + 10);
  }, [gameState]);

  const handleResetClick = useCallback(() => {
    resetState(shuffledPrizes);
  }, [shuffledPrizes]);

  const handlePick = useCallback(
    (prize: string) => {
      if (gameState === GameState.Done) {
        return;
      }

      setWonPrize(prize);
      setGameState(GameState.Done);
    },
    [gameState],
  );

  useEffect(() => {
    // Reset state when user updates prizes from settings
    resetState(prizes);
  }, [prizes]);

  return (
    <Container>
      {shuffledPrizes.length > 0 ? (
        <>
          <ul className="grid grid-cols-4 gap-6">
            {shuffledPrizes.map((prize, idx) => (
              <li key={idx}>
                <PrizeCard
                  prize={prize}
                  state={gameState}
                  animationDuration={ANIMATION_DURATION}
                  winning={gameState === GameState.Done && prize === wonPrize}
                  onPick={handlePick}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center my-10">
            {gameState === GameState.Start && (
              <Button type="button" className="px-24 py-6 text-2xl" onClick={handlePlayClick}>
                {gameState === GameState.Start && 'Play!'}
              </Button>
            )}
            {gameState === GameState.UserPicks && (
              <Button type="button" className="px-24 py-6 text-2xl invisible">
                {gameState === GameState.UserPicks && 'Good Luck 🙂'}
              </Button>
            )}
            {gameState === GameState.Done && (
              <Button type="button" className="px-24 py-6 text-2xl" onClick={handleResetClick}>
                {gameState === GameState.Done && 'Reset'}
              </Button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">Add prizes by clicking on cog icon in the header</p>
      )}
    </Container>
  );
};
