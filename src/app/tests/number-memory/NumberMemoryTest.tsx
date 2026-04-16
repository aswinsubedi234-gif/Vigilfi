'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playClick, playSuccess, playError, playLevelUp } from '@/lib/sounds';
import styles from './NumberMemory.module.css';

const TEST = TESTS.find(t => t.id === 'number-memory')!;
type GameState = 'idle' | 'showing' | 'input' | 'correct' | 'wrong' | 'done';

function generateNumber(digits: number): string {
  let num = '';
  for (let i = 0; i < digits; i++) {
    num += Math.floor(Math.random() * 10).toString();
  }
  return num;
}

export default function NumberMemoryTest() {
  const [state, setState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showTime, setShowTime] = useState(1000);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const startLevel = useCallback((lvl: number) => {
    const digits = lvl + 2; // Level 1 = 3 digits, Level 2 = 4, etc.
    const num = generateNumber(digits);
    setNumber(num);
    setUserInput('');
    setState('showing');
    setShowTime(1000 + lvl * 300); // Longer display for more digits

    timerRef.current = setTimeout(() => {
      setState('input');
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 1000 + lvl * 300);
  }, []);

  const start = useCallback(() => {
    setLevel(1);
    startLevel(1);
  }, [startLevel]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (userInput === number) {
      playSuccess();
      setState('correct');
    } else {
      playError();
      setState('wrong');
    }
  }, [userInput, number]);

  const nextLevel = useCallback(() => {
    playLevelUp();
    const next = level + 1;
    setLevel(next);
    startLevel(next);
  }, [level, startLevel]);

  const finish = useCallback(() => {
    setState('done');
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState('idle');
    setLevel(1);
    setNumber('');
    setUserInput('');
  }, []);

  const score = level + 2 - (state === 'wrong' ? 1 : 0); // digits remembered

  if (state === 'done' || (state === 'wrong')) {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={score} subtitle={`${score} digits remembered`} />
          <div className={styles.lastAttempt}>
            <p className={styles.lastLabel}>The number was:</p>
            <p className={styles.lastNumber}>{number}</p>
            <p className={styles.lastLabel}>You typed:</p>
            <p className={`${styles.lastNumber} ${styles.lastWrong}`}>{userInput || '—'}</p>
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
      <div className={styles.gameArea}>
        {state === 'idle' && (
          <div className={styles.content} onClick={start}>
            <div className={styles.icon}>🔢</div>
            <h1 className={styles.title}>Number Memory</h1>
            <p className={styles.subtitle}>Remember the number that appears, then type it back. Each level adds a digit.</p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        )}

        {state === 'showing' && (
          <div className={styles.content}>
            <p className={styles.levelLabel}>Level {level}</p>
            <div className={styles.numberDisplay}>{number}</div>
            <div className={styles.timerBar}>
              <div className={styles.timerFill} style={{ animationDuration: `${showTime}ms` }} />
            </div>
          </div>
        )}

        {state === 'input' && (
          <div className={styles.content}>
            <p className={styles.levelLabel}>Level {level}</p>
            <p className={styles.inputPrompt}>What was the number?</p>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={styles.numberInput}
                value={userInput}
                onChange={e => setUserInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Type the number..."
                autoFocus
                autoComplete="off"
              />
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
          </div>
        )}

        {state === 'correct' && (
          <div className={styles.content}>
            <div className={styles.correctIcon}>✓</div>
            <h2 className={styles.correctText}>Correct!</h2>
            <p className={styles.correctNum}>{number}</p>
            <button className={styles.nextBtn} onClick={nextLevel}>Next Level →</button>
          </div>
        )}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>About This Test</h3>
            <p>This test measures your short-term memory capacity, specifically your digit span — how many numbers you can hold in working memory at once.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Average Scores</h3>
            <ul>
              <li><strong>10+ digits</strong> — Exceptional memory</li>
              <li><strong>8-9 digits</strong> — Above average</li>
              <li><strong>7 digits</strong> — Average (Miller&apos;s Law)</li>
              <li><strong>&lt; 6 digits</strong> — Below average</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Tips to Improve</h3>
            <p>Try chunking numbers into groups of 3-4 digits. Create patterns or associations. Practice with phone numbers. Memory improves with regular training.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
