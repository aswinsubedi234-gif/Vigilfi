'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playClick, playWhoosh, playMechanicalThock } from '@/lib/sounds';
import styles from './TypingSpeed.module.css';

const TEST = TESTS.find(t => t.id === 'typing-speed')!;

const TEXTS = [
  "The quick brown fox jumps over the lazy dog near the riverbank where wildflowers grow in colorful patches during spring.",
  "Programming is the art of telling a computer what to do through precise instructions that transform logic into reality.",
  "Mountains rise above the clouds casting shadows across the valley below where rivers carve their ancient paths through stone.",
  "Innovation starts with curiosity and grows through persistent effort until an idea becomes something the world cannot ignore.",
  "Every great achievement begins with a single step forward driven by courage and the refusal to accept the comfortable path.",
];

type GameState = 'idle' | 'playing' | 'done';

export default function TypingSpeedTest() {
  const [state, setState] = useState<GameState>('idle');
  const [text, setText] = useState('');
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    const randomText = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    setText(randomText);
    setTyped('');
    setStartTime(Date.now());
    setTimeLeft(30);
    setState('playing');
    setTimeout(() => inputRef.current?.focus(), 50);

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Auto-end when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && state === 'playing') {
      finishTest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, state]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const finishTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const wordsTyped = typed.trim().split(/\s+/).filter(Boolean).length;
    const calculatedWpm = Math.round(wordsTyped / Math.max(elapsed, 0.01));

    // Accuracy
    let correct = 0;
    const minLen = Math.min(typed.length, text.length);
    for (let i = 0; i < minLen; i++) {
      if (typed[i] === text[i]) correct++;
    }
    const calculatedAccuracy = minLen > 0 ? Math.round((correct / minLen) * 100) : 100;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    playWhoosh();
    setState('done');
  }, [startTime, typed, text]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTyped(value);

    // If user finished the text
    if (value.length >= text.length) {
      finishTest();
    }
  }, [text, finishTest]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState('idle');
    setTyped('');
    setWpm(0);
    setAccuracy(100);
  }, []);

  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard
            test={TEST}
            score={wpm}
            subtitle={`${accuracy}% accuracy`}
          />
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>{wpm}</span>
              <span className={styles.statLabel}>WPM</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>{accuracy}%</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>{typed.trim().split(/\s+/).filter(Boolean).length}</span>
              <span className={styles.statLabel}>Words</span>
            </div>
          </div>
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
            <div className={styles.icon}>⌨️</div>
            <h1 className={styles.title}>Typing Speed</h1>
            <p className={styles.subtitle}>
              Type the displayed text as fast and accurately as you can.
              You have <strong>30 seconds</strong>.
            </p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.timer}>
              <span className={styles.timerNum}>{timeLeft}</span>
              <span className={styles.timerLabel}>sec</span>
            </div>
            <div className={styles.liveWpm}>
              {typed.trim().split(/\s+/).filter(Boolean).length > 0
                ? Math.round(
                    typed.trim().split(/\s+/).filter(Boolean).length /
                    Math.max((Date.now() - startTime) / 1000 / 60, 0.01)
                  )
                : 0
              } <span>WPM</span>
            </div>
          </div>

          <div className={styles.textDisplay}>
            {text.split('').map((char, i) => {
              let cls = styles.charPending;
              if (i < typed.length) {
                cls = typed[i] === char ? styles.charCorrect : styles.charWrong;
              } else if (i === typed.length) {
                cls = styles.charCurrent;
              }
              return <span key={i} className={cls}>{char}</span>;
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            className={styles.hiddenInput}
            value={typed}
            onChange={handleInput}
            onKeyDown={(e) => {
               if (e.key.length === 1 || e.key === 'Backspace') {
                 playMechanicalThock();
               }
            }}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          <p className={styles.hint}>Start typing — the input is focused</p>
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>About This Test</h3>
            <p>Measures your typing speed in Words Per Minute (WPM) and accuracy. The average typing speed is 42 WPM.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Average Scores</h3>
            <ul>
              <li><strong>&gt; 80 WPM</strong> — Professional typist</li>
              <li><strong>60-80 WPM</strong> — Fast typist</li>
              <li><strong>40-60 WPM</strong> — Average</li>
              <li><strong>&lt; 40 WPM</strong> — Below average</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Tips to Improve</h3>
            <p>Use proper finger placement on home row keys. Practice daily with typing tutorials. Focus on accuracy first, speed comes naturally.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
