'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playClick, playSuccess, playError, playWhoosh } from '@/lib/sounds';
import styles from './ReactionTime.module.css';

type GameState = 'waiting' | 'ready' | 'tooSoon' | 'go' | 'result' | 'done';

const TEST = TESTS.find(t => t.id === 'reaction-time')!;
const ROUNDS = 5;

export default function ReactionTimeTest() {
  const [state, setState] = useState<GameState>('waiting');
  const [times, setTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [round, setRound] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number>(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startRound = useCallback(() => {
    setState('ready');
    playWhoosh();
    const delay = 1500 + Math.random() * 4000;
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setState('go');
      playClick();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    switch (state) {
      case 'waiting':
        playClick();
        startRound();
        break;

      case 'ready':
        if (timerRef.current) clearTimeout(timerRef.current);
        playError();
        setState('tooSoon');
        break;

      case 'tooSoon':
        playClick();
        startRound();
        break;

      case 'go': {
        const reactionTime = Math.round(performance.now() - startRef.current);
        setCurrentTime(reactionTime);
        const newTimes = [...times, reactionTime];
        setTimes(newTimes);
        const newRound = round + 1;
        setRound(newRound);
        playSuccess();
        if (newRound >= ROUNDS) {
          setState('done');
        } else {
          setState('result');
        }
        break;
      }

      case 'result':
        playClick();
        startRound();
        break;

      case 'done':
        break;
    }
  }, [state, times, round, startRound]);

  // Keyboard support — spacebar/enter to interact
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClick]);



  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState('waiting');
    setTimes([]);
    setCurrentTime(0);
    setRound(0);
  }, []);

  const average = times.length > 0
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : 0;

  const getStateClass = () => {
    switch (state) {
      case 'waiting': return styles.stateWaiting;
      case 'ready': return styles.stateReady;
      case 'tooSoon': return styles.stateTooSoon;
      case 'go': return styles.stateGo;
      case 'result': return styles.stateResult;
      case 'done': return styles.stateDone;
    }
  };

  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={average} subtitle={`Average of ${ROUNDS} rounds`} />
          <div className={styles.roundsBreakdown}>
            <h3>Round Breakdown</h3>
            <div className={styles.roundsList}>
              {times.map((t, i) => (
                <div key={i} className={styles.roundItem}>
                  <span className={styles.roundNum}>Round {i + 1}</span>
                  <div className={styles.roundBar}>
                    <div
                      className={styles.roundBarFill}
                      style={{ width: `${Math.min(100, (t / 500) * 100)}%` }}
                    />
                  </div>
                  <span className={styles.roundTime}>{t}ms</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.resultActions}>
            <button className={styles.retryBtn} onClick={reset}>
              <RotateCcw size={18} />
              Try Again
            </button>
            <Link href="/" className={styles.backBtn}>
              <ArrowLeft size={18} />
              All Tests
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={`${styles.gameArea} ${getStateClass()}`} onClick={handleClick}>
        {state === 'waiting' && (
          <div className={styles.content}>
            <div className={styles.icon}>⚡</div>
            <h1 className={styles.title}>Reaction Time</h1>
            <p className={styles.subtitle}>
              When the red box turns <strong>green</strong>, click as quickly as you can.
              <br />
              <span className={styles.keyHint}>Press <kbd>Space</kbd> or click anywhere</span>
            </p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        )}

        {state === 'ready' && (
          <div className={styles.content}>
            <h2 className={styles.bigText}>Wait for green...</h2>
            <div className={styles.crosshair}>
              <div className={styles.crosshairH} />
              <div className={styles.crosshairV} />
            </div>
          </div>
        )}

        {state === 'tooSoon' && (
          <div className={styles.content}>
            <h2 className={styles.bigText}>Too soon! 😬</h2>
            <p className={styles.subtitle}>Wait for the green screen before clicking.</p>
            <p className={styles.cta}>Click to try again</p>
          </div>
        )}

        {state === 'go' && (
          <div className={styles.content}>
            <h2 className={styles.clickText}>CLICK!</h2>
          </div>
        )}

        {state === 'result' && (
          <div className={styles.content}>
            <p className={styles.roundLabel}>Round {round}/{ROUNDS}</p>
            <div className={styles.timeDisplay}>{currentTime}<span>ms</span></div>
            <p className={styles.feedbackMsg}>
              {currentTime < 150 ? '🔥 Incredible!' :
               currentTime < 200 ? '⚡ Amazing!' :
               currentTime < 250 ? '✨ Great!' :
               currentTime < 300 ? '👍 Good' : '💪 Keep trying!'}
            </p>
            <div className={styles.progressDots}>
              {Array.from({ length: ROUNDS }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.dot} ${i < round ? styles.dotFilled : ''}`}
                />
              ))}
            </div>
            <p className={styles.cta}>Click to continue</p>
          </div>
        )}
      </div>

      {/* Info Section Below */}
      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>About This Test</h3>
            <p>
              The reaction time test measures how fast you respond to a visual stimulus.
              Your score is the average reaction time across {ROUNDS} rounds, measured with
              sub-millisecond precision using <code>performance.now()</code>.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Average Scores</h3>
            <ul>
              <li><strong>&lt; 150ms</strong> — Exceptional (top 1%)</li>
              <li><strong>150-200ms</strong> — Excellent</li>
              <li><strong>200-300ms</strong> — Average</li>
              <li><strong>&gt; 300ms</strong> — Below average</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Tips to Improve</h3>
            <p>
              Focus on the screen, stay relaxed, and avoid anticipating the green.
              Sleep quality, caffeine intake, and regular practice can improve
              reaction times significantly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
