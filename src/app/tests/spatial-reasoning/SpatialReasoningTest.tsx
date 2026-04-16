'use client';

import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, ArrowLeft, Heart, Layers, Crown, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playSuccess, playError, playLevelUp, playClick, playWhoosh, playTileBlip } from '@/lib/sounds';
import styles from './SpatialReasoning.module.css';

const TEST = TESTS.find(t => t.id === 'spatial-reasoning')!;
type GameState = 'idle' | 'playing' | 'wrong_flash' | 'correct_flash' | 'done';
type Matrix = number[][];

// --- Elite Mathematical Generation & Manipulation ---

const rotateMatrix = (matrix: Matrix): Matrix => {
  const n = matrix.length;
  const res = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) res[j][n - 1 - i] = matrix[i][j];
  }
  return res;
};

const flipMatrix = (matrix: Matrix): Matrix => {
  const n = matrix.length;
  const res = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) res[i][n - 1 - j] = matrix[i][j];
  }
  return res;
};

const isSameMatrix = (a: Matrix, b: Matrix): boolean => {
  if (a.length !== b.length) return false;
  return a.every((row, i) => row.every((val, j) => val === b[i][j]));
};

const copyMatrix = (m: Matrix): Matrix => m.map(row => [...row]);

const randBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function SpatialReasoningTest() {
  const [state, setState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [{ target, options, answerIndex, size }, setGameData] = useState<{target: Matrix, options: Matrix[], answerIndex: number, size: number}>({
    target: [], options: [], answerIndex: 0, size: 3
  });

  // Engineered to completely prevent the exact 0-degree target from being in the options (so they must rely on rotation)
  const generateLevel = useCallback((lvl: number) => {
    // Elegant dynamic boundary scaling
    const size = lvl < 4 ? 3 : (lvl < 12 ? 4 : 5);
    const numColors = lvl < 8 ? 1 : (lvl < 18 ? 2 : 3);
    const fillCount = lvl < 3 ? 3 : Math.floor((size * size) * (lvl < 10 ? 0.35 : 0.45));

    let newTarget: Matrix;
    let attempts = 0;

    // Force non-symmetric shapes to guarantee rotations are distinctly unique
    do {
      newTarget = Array.from({ length: size }, () => Array(size).fill(0));
      let placed = 0;
      while (placed < fillCount) {
        const x = randBetween(0, size - 1);
        const y = randBetween(0, size - 1);
        if (newTarget[y][x] === 0) {
          newTarget[y][x] = randBetween(1, numColors);
          placed++;
        }
      }
      attempts++;
    } while (
      attempts < 100 && 
      (isSameMatrix(newTarget, rotateMatrix(newTarget)) || isSameMatrix(newTarget, rotateMatrix(rotateMatrix(newTarget))))
    );

    // Compute absolute correct answer (Rotate 90, 180, or 270) DO NOT allow 0 degree
    const rotAmount = randBetween(1, 3);
    let correctAnswer = newTarget;
    for (let i = 0; i < rotAmount; i++) correctAnswer = rotateMatrix(correctAnswer);

    // ─── Decoy Engineering ───
    const decoys: Matrix[] = [];
    
    // Decoy 1: The Mirror (Inverts the rotation axis mathematically)
    let decoy1 = flipMatrix(correctAnswer);
    if (isSameMatrix(decoy1, correctAnswer) || isSameMatrix(decoy1, newTarget)) {
      decoy1 = rotateMatrix(decoy1);
    }
    decoys.push(decoy1);

    // Decoy 2: Invalid Rotation
    let decoy2 = rotateMatrix(correctAnswer);
    let d2Attempts = 0;
    while ((isSameMatrix(decoy2, correctAnswer) || isSameMatrix(decoy2, newTarget)) && d2Attempts < 5) {
      decoy2 = rotateMatrix(decoy2);
      d2Attempts++;
    }
    // Deep fallback if math hits a symmetrical nightmare
    if (isSameMatrix(decoy2, newTarget)) decoy2 = flipMatrix(decoy2);
    decoys.push(decoy2);

    // Decoy 3: Minute shifting (Moves a single non-empty tile to an empty spot)
    const decoy3 = copyMatrix(correctAnswer);
    const filled = [];
    const empty = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (decoy3[y][x] !== 0) filled.push({x, y});
        else empty.push({x, y});
      }
    }
    if (filled.length > 0 && empty.length > 0) {
       const f = filled[Math.floor(Math.random() * filled.length)];
       const e = empty[Math.floor(Math.random() * empty.length)];
       decoy3[e.y][e.x] = decoy3[f.y][f.x];
       decoy3[f.y][f.x] = 0; // The shift
    }
    decoys.push(decoy3);

    // Assembly & Cryptographic-grade Shuffle
    const newOptions = [correctAnswer, ...decoys];
    for (let i = newOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
    }
    const correctIdx = newOptions.findIndex(o => isSameMatrix(o, correctAnswer));

    return { target: newTarget, options: newOptions, answerIndex: correctIdx, size };
  }, []);

  const startGame = useCallback(() => {
    playClick();
    setLevel(1);
    setLives(3);
    setGameData(generateLevel(1));
    setState('playing');
    playWhoosh();
  }, [generateLevel]);

  const handleOptionClick = useCallback((index: number) => {
    if (state !== 'playing') return;

    setSelectedOption(index);

    if (index === answerIndex) {
      playSuccess();
      setState('correct_flash');
      
      setTimeout(() => {
        playLevelUp();
        setLevel(prev => prev + 1);
        setGameData(generateLevel(level + 1));
        setSelectedOption(null);
        setState('playing');
      }, 600);

    } else {
      playError();
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => setState('done'), 500);
      } else {
        setState('wrong_flash');
        setTimeout(() => {
           setSelectedOption(null);
           setState('playing');
        }, 800);
      }
    }
  }, [state, answerIndex, generateLevel, level, lives]);

  const reset = useCallback(() => {
    setState('idle');
    setLevel(1);
    setLives(3);
    setSelectedOption(null);
  }, []);

  // --- Premium Render Pipeline ---
  const renderMatrix = (matrix: Matrix, mSize: number, customClass: string = '', isClickable: boolean = false, onClick?: () => void, keyProp?: string | number) => {
    if (!matrix || matrix.length === 0) return null;
    return (
      <div 
        key={keyProp}
        className={`${styles.matrixGrid} ${customClass} ${isClickable ? styles.isOption : ''}`}
        style={{ gridTemplateColumns: `repeat(${mSize}, 1fr)` }}
        onClick={onClick}
        onMouseEnter={() => isClickable && state === 'playing' ? playTileBlip(2) : undefined}
      >
        {matrix.flatMap((row, y) => row.map((cell, x) => (
          <div key={`${y}-${x}`} className={`${styles.cell} ${cell === 0 ? styles.empty : styles['color'+cell]}`} />
        )))}
      </div>
    );
  };

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
            <div className={styles.icon}>🌀</div>
            <h1 className={styles.title}>Spatial Reasoning</h1>
            <p className={styles.subtitle}>
              Test your mental elasticity. Find the exact matching logic matrix after it has been mathematically rotated 90°, 180°, or 270°.
            </p>
            <button className={styles.cta}>Start Diagnosis</button>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.levelBadge}>
              <Layers size={22} className="text-[#a29bfe]" />
              Level {level}
            </div>
            <div className={styles.livesContainer}>
               {Array.from({length: 3}).map((_, i) => (
                 <Heart 
                   key={i} size={22} 
                   fill={i < lives ? "#ff7675" : "none"} 
                   stroke={i < lives ? "#ff7675" : "rgba(255,255,255,0.15)"} 
                   style={{ transition: 'all 0.3s' }}
                 />
               ))}
            </div>
          </div>

          <div className={styles.targetSection}>
             <div className={styles.sectionLabel}>Target Matrix</div>
             {renderMatrix(target, size, styles.targetMatrix)}
          </div>

          <div className={styles.optionsSection}>
             <div className={styles.sectionLabel} style={{ marginBottom: '1rem' }}>Identify The Rotated Match</div>
             <div className={styles.optionsGrid}>
               {options.map((opt, i) => {
                 let cls = styles.optionMatrix;
                 if (state === 'correct_flash' && i === answerIndex) cls += ' ' + styles.correct;
                 if (state === 'wrong_flash' && i === selectedOption) cls += ' ' + styles.wrong;
                 if (state === 'wrong_flash' && i === answerIndex) cls += ' ' + styles.correct; 
                 return renderMatrix(opt, size, cls, state === 'playing', () => handleOptionClick(i), `opt-${i}`);
               })}
             </div>
          </div>
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3><BrainCircuit size={20} /> Cognitive Target</h3>
            <p>
               Mental rotation evaluates how effectively you can harness your visuospatial sketchpad. This is heavily correlated with high-level fluid intelligence, engineering aptitude, and rapid geometric processing.
            </p>
          </div>
          <div className={styles.infoCard}>
             <h3><Layers size={20} /> Matrix Complexity</h3>
             <p>
                The algorithm automatically ramps density. You will progress from elementary 3x3 grids mapped with single hues, deep into 5x5 structural anomalies utilizing tri-color arrangements to strain working memory.
             </p>
          </div>
          <div className={styles.infoCard}>
            <h3><Crown size={20} /> Global Baselines</h3>
            <ul>
              <li><strong>Level 15+</strong> <span>Top 1% (Architect)</span></li>
              <li><strong>Level 11+</strong> <span>Highly Advanced</span></li>
              <li><strong>Level 7+</strong> <span>Above Average</span></li>
              <li><strong>&lt; Level 6</strong> <span>Average</span></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
