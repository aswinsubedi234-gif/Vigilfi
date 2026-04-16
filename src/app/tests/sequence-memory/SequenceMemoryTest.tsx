'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playTileBlip, playSuccess, playError, playLevelUp, playClick } from '@/lib/sounds';
import styles from './SequenceMemory.module.css';

const TEST = TESTS.find(t => t.id === 'sequence-memory')!;
type GameState = 'idle' | 'showing' | 'input' | 'correct' | 'wrong' | 'done';

const GRID_SIZE = 3; // 3x3 grid

export default function SequenceMemoryTest() {
  const [state, setState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userIndex, setUserIndex] = useState(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [flashCorrect, setFlashCorrect] = useState(false);
  const [flashWrong, setFlashWrong] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timerRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(t => clearTimeout(t));
    timerRef.current = [];
  }, []);

  const playSequence = useCallback((seq: number[]) => {
    setState('showing');
    setActiveTile(null);
    clearTimers();

    seq.forEach((tile, i) => {
      const showTimer = setTimeout(() => {
        setActiveTile(tile);
        playTileBlip(tile);
      }, i * 600 + 400);

      const hideTimer = setTimeout(() => {
        setActiveTile(null);
      }, i * 600 + 800);

      timerRef.current.push(showTimer, hideTimer);
    });

    const doneTimer = setTimeout(() => {
      setState('input');
      setUserIndex(0);
    }, seq.length * 600 + 500);

    timerRef.current.push(doneTimer);
  }, [clearTimers]);

  const startGame = useCallback(() => {
    playClick();
    const firstTile = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    const seq = [firstTile];
    setSequence(seq);
    setLevel(1);
    playSequence(seq);
  }, [playSequence]);

  const nextLevel = useCallback(() => {
    const newTile = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    const newSeq = [...sequence, newTile];
    setSequence(newSeq);
    setLevel(prev => prev + 1);
    setFlashCorrect(false);
    playLevelUp();
    playSequence(newSeq);
  }, [sequence, playSequence]);

  const handleTileClick = useCallback((index: number) => {
    if (state !== 'input') return;

    if (index === sequence[userIndex]) {
      // Correct
      const nextIndex = userIndex + 1;
      setActiveTile(index);
      playTileBlip(index);
      setTimeout(() => setActiveTile(null), 200);

      if (nextIndex >= sequence.length) {
        // Completed the sequence
        setFlashCorrect(true);
        setState('correct');
        playSuccess();
      } else {
        setUserIndex(nextIndex);
      }
    } else {
      // Wrong
      setFlashWrong(index);
      playError();
      setState('done');
    }
  }, [state, sequence, userIndex]);

  const reset = useCallback(() => {
    clearTimers();
    setState('idle');
    setLevel(1);
    setSequence([]);
    setUserIndex(0);
    setActiveTile(null);
    setFlashCorrect(false);
    setFlashWrong(null);
  }, [clearTimers]);

  const score = state === 'done' ? level - 1 : level;

  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={score} subtitle={`Reached level ${score}`} />
          <div className={styles.resultActions}>
            <button className={styles.retryBtn} onClick={reset}>
              <RotateCcw size={18} /> Try Again
            </button>
            <Link href="/" className={styles.backBtn}>
              <ArrowLeft size={18} /> All Tests
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {state === 'idle' ? (
        <div className={styles.gameArea} onClick={startGame}>
          <div className={styles.content}>
            <div className={styles.icon}>🧩</div>
            <h1 className={styles.title}>Sequence Memory</h1>
            <p className={styles.subtitle}>
              Watch the sequence of tiles that light up, then repeat the pattern. It grows each round.
            </p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.levelBadge}>Level {level}</div>
            <div className={styles.stateLabel}>
              {state === 'showing' && 'Watch the pattern...'}
              {state === 'input' && `Your turn (${userIndex + 1}/${sequence.length})`}
              {state === 'correct' && 'Correct!'}
            </div>
          </div>

          <div
            className={styles.grid}
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const isActive = activeTile === i;
              const isWrong = flashWrong === i;
              const isCorrectFlash = flashCorrect;

              let cls = styles.tile;
              if (isActive) cls += ' ' + styles.tileActive;
              if (isWrong) cls += ' ' + styles.tileWrong;
              if (isCorrectFlash) cls += ' ' + styles.tileCorrectAll;

              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleTileClick(i)}
                  disabled={state !== 'input'}
                  aria-label={`Tile ${i + 1}`}
                />
              );
            })}
          </div>

          {state === 'correct' && (
            <button className={styles.nextBtn} onClick={nextLevel}>
              Next Level →
            </button>
          )}
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>About This Test</h3>
            <p>
              This test measures your sequential memory — your ability to remember
              and reproduce ordered patterns. It is similar to the classic
              &quot;Simon Says&quot; game and tests working memory capacity.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Average Scores</h3>
            <ul>
              <li><strong>Level 12+</strong> — Exceptional memory</li>
              <li><strong>Level 9-11</strong> — Above average</li>
              <li><strong>Level 7-8</strong> — Average</li>
              <li><strong>&lt; Level 6</strong> — Below average</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Tips to Improve</h3>
            <p>
              Try to visualize the path as a shape or pattern rather than individual
              tiles. Rhythm helps — tap along as you watch. Practice regularly to
              build your sequential working memory.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
