'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playClick, playSuccess, playError, playLevelUp } from '@/lib/sounds';
import styles from './VisualMemory.module.css';

const TEST = TESTS.find(t => t.id === 'visual-memory')!;
type GameState = 'idle' | 'showing' | 'input' | 'done';

function getConfig(level: number) {
  const gridSize = Math.min(3 + Math.floor(level / 3), 7);
  const tilesCount = Math.min(level + 2, Math.floor(gridSize * gridSize * 0.5));
  return { gridSize, tilesCount };
}

function pickRandom(total: number, count: number): Set<number> {
  const set = new Set<number>();
  while (set.size < count) {
    set.add(Math.floor(Math.random() * total));
  }
  return set;
}

export default function VisualMemoryTest() {
  const [state, setState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [activeTiles, setActiveTiles] = useState<Set<number>>(new Set());
  const [userClicked, setUserClicked] = useState<Set<number>>(new Set());
  const [wrongTiles, setWrongTiles] = useState<Set<number>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const setupLevel = useCallback((lvl: number) => {
    const { gridSize, tilesCount } = getConfig(lvl);
    const tiles = pickRandom(gridSize * gridSize, tilesCount);
    setActiveTiles(tiles);
    setUserClicked(new Set());
    setWrongTiles(new Set());
    setCorrectCount(0);
    setLevel(lvl);
    setState('showing');

    timerRef.current = setTimeout(() => {
      setState('input');
    }, 1000 + lvl * 150);
  }, []);

  const start = useCallback(() => {
    playClick();
    setLives(3);
    setupLevel(1);
  }, [setupLevel]);

  const handleTileClick = useCallback((index: number) => {
    if (state !== 'input') return;
    if (userClicked.has(index)) return;

    const newClicked = new Set(userClicked);
    newClicked.add(index);
    setUserClicked(newClicked);

    if (activeTiles.has(index)) {
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      playClick();
      if (newCorrect >= activeTiles.size) {
        playLevelUp();
        // Level complete
        timerRef.current = setTimeout(() => setupLevel(level + 1), 500);
      }
    } else {
      const newWrong = new Set(wrongTiles);
      newWrong.add(index);
      setWrongTiles(newWrong);
      const newLives = lives - 1;
      setLives(newLives);
      playError();
      if (newLives <= 0) {
        setState('done');
      }
    }
  }, [state, userClicked, activeTiles, correctCount, wrongTiles, lives, level, setupLevel]);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState('idle');
    setLevel(1);
    setLives(3);
  }, []);

  const { gridSize, tilesCount } = getConfig(level);

  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={level - 1} subtitle={`Reached level ${level - 1}`} />
          <div className={styles.resultActions}>
            <button className={styles.retryBtn} onClick={reset}><RotateCcw size={18} /> Try Again</button>
            <Link href="/" className={styles.backBtn}><ArrowLeft size={18} /> All Tests</Link>
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
            <div className={styles.icon}>👁️</div>
            <h1 className={styles.title}>Visual Memory</h1>
            <p className={styles.subtitle}>Memorize the highlighted tiles, then click them from memory. The grid grows each level.</p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.levelBadge}>Level {level}</div>
            <div className={styles.info}>{tilesCount} tiles</div>
            <div className={styles.livesDisplay}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={`${styles.heart} ${i < lives ? styles.heartFull : styles.heartEmpty}`}>♥</span>
              ))}
            </div>
          </div>

          <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const isActive = activeTiles.has(i);
              const isClicked = userClicked.has(i);
              const isWrong = wrongTiles.has(i);
              const isShowing = state === 'showing' && isActive;
              const isCorrectClick = state === 'input' && isClicked && isActive;

              let cls = styles.tile;
              if (isShowing) cls += ' ' + styles.tileActive;
              if (isCorrectClick) cls += ' ' + styles.tileCorrect;
              if (isWrong) cls += ' ' + styles.tileWrong;

              return (
                <button key={`${level}-${i}`} className={cls} onClick={() => handleTileClick(i)} aria-label={`Tile ${i + 1}`} />
              );
            })}
          </div>

          <p className={styles.hint}>
            {state === 'showing' ? 'Memorize the pattern...' : 'Click the tiles that were highlighted'}
          </p>
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}><h3>About This Test</h3><p>Measures your visual-spatial working memory — your ability to remember the positions of objects in space.</p></div>
          <div className={styles.infoCard}><h3>Average Scores</h3><ul><li><strong>Level 12+</strong> — Exceptional</li><li><strong>Level 8-11</strong> — Above average</li><li><strong>Level 5-7</strong> — Average</li><li><strong>&lt; Level 5</strong> — Below average</li></ul></div>
          <div className={styles.infoCard}><h3>Tips</h3><p>Try to see the pattern as a shape rather than individual tiles. Grouping tiles into clusters makes them easier to remember.</p></div>
        </div>
      </div>
    </main>
  );
}
