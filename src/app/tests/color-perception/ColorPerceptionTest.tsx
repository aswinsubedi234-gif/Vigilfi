'use client';

import { useState, useCallback, useMemo } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playClick, playSuccess, playError } from '@/lib/sounds';
import styles from './ColorPerception.module.css';

const TEST = TESTS.find(t => t.id === 'color-perception')!;
type GameState = 'idle' | 'playing' | 'wrong' | 'done';

function generateColor(): { h: number; s: number; l: number } {
  return {
    h: Math.floor(Math.random() * 360),
    s: 50 + Math.floor(Math.random() * 30),
    l: 35 + Math.floor(Math.random() * 25),
  };
}

function getGridSize(level: number): number {
  if (level <= 5) return 2;   // 2x2
  if (level <= 10) return 3;  // 3x3
  if (level <= 20) return 4;  // 4x4
  if (level <= 30) return 5;  // 5x5
  return 6;                    // 6x6
}

function getHueDiff(level: number): number {
  // Starts at 30 degrees difference, decreases each level
  return Math.max(2, 35 - level * 1.2);
}

export default function ColorPerceptionTest() {
  const [state, setState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [baseColor, setBaseColor] = useState(generateColor());
  const [oddIndex, setOddIndex] = useState(0);
  const [flashWrong, setFlashWrong] = useState<number | null>(null);

  const gridSize = useMemo(() => getGridSize(level), [level]);
  const totalTiles = gridSize * gridSize;
  const hueDiff = useMemo(() => getHueDiff(level), [level]);

  const setupLevel = useCallback((lvl: number) => {
    const color = generateColor();
    setBaseColor(color);
    setOddIndex(Math.floor(Math.random() * getGridSize(lvl) ** 2));
    setLevel(lvl);
    setFlashWrong(null);
  }, []);

  const start = useCallback(() => {
    playClick();
    setLives(3);
    setupLevel(1);
    setState('playing');
  }, [setupLevel]);

  const handleTileClick = useCallback((index: number) => {
    if (state !== 'playing') return;

    if (index === oddIndex) {
      // Correct!
      playSuccess();
      const nextLevel = level + 1;
      setupLevel(nextLevel);
    } else {
      // Wrong
      setFlashWrong(index);
      playError();
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setState('done');
      } else {
        setTimeout(() => setFlashWrong(null), 500);
      }
    }
  }, [state, oddIndex, level, lives, setupLevel]);

  const reset = useCallback(() => {
    setState('idle');
    setLevel(1);
    setLives(3);
    setFlashWrong(null);
  }, []);

  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={level - 1} subtitle={`Reached level ${level - 1}`} />
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
        <div className={styles.gameArea} onClick={start}>
          <div className={styles.content}>
            <div className={styles.icon}>🎨</div>
            <h1 className={styles.title}>Color Perception</h1>
            <p className={styles.subtitle}>
              Find the tile with a <strong>slightly different color</strong>.
              Each level gets harder. You have 3 lives.
            </p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.levelBadge}>Level {level}</div>
            <div className={styles.livesDisplay}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={`${styles.heart} ${i < lives ? styles.heartFull : styles.heartEmpty}`}>
                  ♥
                </span>
              ))}
            </div>
          </div>

          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              '--grid-size': gridSize,
            } as React.CSSProperties}
          >
            {Array.from({ length: totalTiles }).map((_, i) => {
              const isOdd = i === oddIndex;
              const h = isOdd ? baseColor.h + hueDiff : baseColor.h;
              const bg = `hsl(${h}, ${baseColor.s}%, ${baseColor.l}%)`;

              return (
                <button
                  key={`${level}-${i}`}
                  className={`${styles.tile} ${flashWrong === i ? styles.tileWrong : ''}`}
                  style={{ backgroundColor: bg }}
                  onClick={() => handleTileClick(i)}
                  aria-label={`Tile ${i + 1}`}
                />
              );
            })}
          </div>

          <p className={styles.hint}>Tap the tile that&apos;s a different color</p>
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>About This Test</h3>
            <p>This test measures your color perception accuracy — how well your eyes can distinguish between similar shades and hues. The difference becomes smaller each level.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Average Scores</h3>
            <ul>
              <li><strong>Level 25+</strong> — Exceptional (top 2%)</li>
              <li><strong>Level 20-24</strong> — Excellent color vision</li>
              <li><strong>Level 15-19</strong> — Above average</li>
              <li><strong>Level 10-14</strong> — Average</li>
              <li><strong>&lt; Level 10</strong> — May indicate color vision issues</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Did You Know?</h3>
            <p>About 8% of men and 0.5% of women have some form of color vision deficiency. Screen brightness and quality can also affect your results. For best results, maximize your screen brightness.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
