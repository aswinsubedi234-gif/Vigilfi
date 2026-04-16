'use client';

import { useState, useEffect, useCallback } from 'react';
import { playTick, playGo } from '@/lib/sounds';
import styles from './Countdown.module.css';

interface CountdownProps {
  onComplete: () => void;
  from?: number;
}

export default function Countdown({ onComplete, from = 3 }: CountdownProps) {
  const [count, setCount] = useState(from);
  const [phase, setPhase] = useState<'counting' | 'go' | 'done'>('counting');

  useEffect(() => {
    if (phase === 'done') return;

    if (phase === 'counting' && count > 0) {
      playTick();
      const timer = setTimeout(() => {
        if (count === 1) {
          setPhase('go');
          playGo();
        } else {
          setCount(prev => prev - 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'go') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [count, phase, onComplete, from]);

  if (phase === 'done') return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.inner}>
        {phase === 'counting' && (
          <span key={count} className={styles.number}>{count}</span>
        )}
        {phase === 'go' && (
          <span className={styles.go}>GO!</span>
        )}
      </div>
    </div>
  );
}
