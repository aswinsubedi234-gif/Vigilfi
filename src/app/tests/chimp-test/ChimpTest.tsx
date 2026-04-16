'use client';

import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, ArrowLeft, Heart, Brain, Crown, Globe } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playSuccess, playError, playLevelUp, playClick, playWhoosh, playTileBlip } from '@/lib/sounds';
import styles from './ChimpTest.module.css';

const TEST = TESTS.find(t => t.id === 'chimp-test')!;

type GameState = 'idle' | 'memorize' | 'hidden' | 'done';

const GRID_COLS = 8;
const GRID_ROWS = 5;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

export default function ChimpTest() {
  const [state, setState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [isShaking, setIsShaking] = useState(false);

  // The grid holds the value of the number present, or 0 if empty
  const [grid, setGrid] = useState<number[]>(Array(TOTAL_CELLS).fill(0));
  const [nextExpected, setNextExpected] = useState(1);
  // Track which tiles the user has successfully clicked so they vanish
  const [poppedTiles, setPoppedTiles] = useState<Set<number>>(new Set());

  // --- Generation Logic ---
  const generateLevel = useCallback((lvl: number) => {
    const numBlocks = lvl + 3; // Level 1 = 4 blocks
    
    // Generate empty array
    const newGrid = Array(TOTAL_CELLS).fill(0);
    
    // Pick unique random indices
    const availableIndices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    // Shuffle indices (Fisher-Yates)
    for (let i = availableIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }

    // Place numbers 1 through numBlocks
    for (let i = 1; i <= numBlocks; i++) {
       newGrid[availableIndices[i - 1]] = i;
    }

    setGrid(newGrid);
    setNextExpected(1);
    setPoppedTiles(new Set());
    setState('memorize');
  }, []);

  const startGame = useCallback(() => {
    playClick();
    setLevel(1);
    setLives(3);
    generateLevel(1);
    playWhoosh();
  }, [generateLevel]);

  const handleMistake = useCallback(() => {
     playError();
     setIsShaking(true);
     setTimeout(() => setIsShaking(false), 500);

     const newLives = lives - 1;
     setLives(newLives);

     if (newLives <= 0) {
        setTimeout(() => setState('done'), 500);
     } else {
        // Punish player by resetting the current level
        setTimeout(() => {
          generateLevel(level);
        }, 800);
     }
  }, [lives, level, generateLevel]);

  const handleTileClick = useCallback((index: number) => {
    const value = grid[index];
    if (value === 0 || poppedTiles.has(value)) return; // Ignored clicks

    if (state === 'memorize') {
       if (value === 1) {
         // Good. Transition to hidden phase
         playTileBlip(1);
         const newPopped = new Set(poppedTiles);
         newPopped.add(1);
         setPoppedTiles(newPopped);
         setNextExpected(2);
         setState('hidden');
         
         // If level 1 only had 4 blocks and we just hit the 1st
         if (level + 3 === 1) {
            // Technically impossible since lvl 1=4, but good safeguard
            playLevelUp();
         }
       } else {
         // Clicked wrong number during memorize (e.g., clicked 3 before 1)
         handleMistake();
       }
    } 
    else if (state === 'hidden') {
       if (value === nextExpected) {
          playTileBlip(value);
          const newPopped = new Set(poppedTiles);
          newPopped.add(value);
          setPoppedTiles(newPopped);
          setNextExpected(prev => prev + 1);

          // Did we just click the last one?
          if (value === level + 3) {
             playSuccess();
             setTimeout(() => {
                playLevelUp();
                setLevel(prev => prev + 1);
                generateLevel(level + 1);
             }, 400);
          }
       } else {
          // Wrong hidden tile clicked!
          handleMistake();
       }
    }
  }, [grid, poppedTiles, state, nextExpected, level, generateLevel, handleMistake]);



  const reset = useCallback(() => {
    setState('idle');
    setLevel(1);
    setLives(3);
  }, []);

  // --- Render ---
  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={level - 1} subtitle={`Reached Level ${level - 1}`} />
          <div className={styles.resultActions}>
            <button className={styles.retryBtn} onClick={reset}>
              <RotateCcw size={20} /> Try Again
            </button>
            <Link href="/" className={styles.backBtn}>
              <ArrowLeft size={20} /> All Tests
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
            <div className={styles.icon}>🐵</div>
            <h1 className={styles.title}>Chimp Memory</h1>
            <p className={styles.subtitle}>
              Can you beat a chimpanzee? Memorize the sequence of numbers on the grid. The moment you click the first tile, the rest disappear.
            </p>
            <button className={styles.cta}>Start Test</button>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.levelBadge}>
              <Brain size={22} className="text-[#00b894]" />
              Level {level}
            </div>
            <div className={styles.livesContainer}>
               {Array.from({length: 3}).map((_, i) => (
                 <Heart 
                   key={i} size={22} 
                   fill={i < lives ? "#00b894" : "none"} 
                   stroke={i < lives ? "#00b894" : "rgba(255,255,255,0.15)"} 
                   style={{ transition: 'all 0.3s' }}
                 />
               ))}
            </div>
          </div>

          <div className={`${styles.targetSection} ${isShaking ? styles.shake : ''}`}>
             <div className={styles.matrixGrid} style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}>
               {grid.map((val, idx) => {
                 // Blank placeholder cell if no number was assigned
                 if (val === 0) {
                    return <div key={`empty-${idx}`} className={styles.cellStage} />;
                 }

                 // Determine state class
                 const isHidden = state === 'hidden';
                 const isPopped = poppedTiles.has(val);

                 let cardClass = styles.card;
                 if (isHidden) cardClass += ` ${styles.hidden}`;
                 if (isPopped) cardClass += ` ${styles.popped}`;

                 return (
                   <div key={`cell-${idx}`} className={styles.cellStage} onClick={() => handleTileClick(idx)}>
                     <div className={cardClass}>
                        <div className={styles.faceFront}>{val}</div>
                        <div className={styles.faceBack} />
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3><Brain size={20} /> Kyoto University Primate Research</h3>
            <p>
               This exact test was administered to chimpanzees (notably Ayumu) at the Primate Research Institute. While young chimps can flash-memorize 9 numbers instantly, adult humans average less than 6. Can you outsmart genetics?
            </p>
          </div>
          <div className={styles.infoCard}>
             <h3><Globe size={20} /> Working Memory Engine</h3>
             <p>
                As you advance, the number sequence continually grows. Successfully pushing past Level 10 proves your eidetic (photographic) trace memory sits within the highest percentiles of visual capacity globally.
             </p>
          </div>
          <div className={styles.infoCard}>
            <h3><Crown size={20} /> Human Baselines</h3>
            <ul>
              <li><strong>Level 12+</strong> <span>The Silverback (Elite)</span></li>
              <li><strong>Level 9 - 11</strong> <span>Chimp Equivalent</span></li>
              <li><strong>Level 6 - 8</strong> <span>Above Average Core</span></li>
              <li><strong>&lt; Level 5</strong> <span>Average Human</span></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
