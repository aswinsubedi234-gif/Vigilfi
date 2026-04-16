'use client';

import { useRef, useCallback, useEffect } from 'react';
import { Download, Link2, Share2 } from 'lucide-react';
import { getPercentile, getPercentileLabel, getPercentileColor } from '@/lib/tests';
import { saveScore, updateStreak, checkAchievements, ACHIEVEMENT_DEFS } from '@/lib/storage';
import { playScoreReveal, playAchievement } from '@/lib/sounds';
import type { TestInfo } from '@/lib/tests';
import { useToast } from '@/components/Toast';
import { useConfetti } from '@/components/Confetti';
import AnimatedCounter from '@/components/AnimatedCounter';
import styles from './ResultCard.module.css';

interface ResultCardProps {
  test: TestInfo;
  score: number;
  subtitle?: string;
}

export default function ResultCard({ test, score, subtitle }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const fireConfetti = useConfetti();
  const percentile = getPercentile(test.id, score);
  const label = getPercentileLabel(percentile);
  const barColor = getPercentileColor(percentile);

  // Save score, check achievements, update streak on mount
  useEffect(() => {
    saveScore(test.id, score, percentile);
    updateStreak();

    // Play score reveal sound
    setTimeout(() => playScoreReveal(), 200);

    const newAchievements = checkAchievements(test.id, score);
    
    // Show achievement toasts with delay
    newAchievements.forEach((id, i) => {
      const def = ACHIEVEMENT_DEFS.find(a => a.id === id);
      if (def) {
        setTimeout(() => {
          playAchievement();
          toast(`${def.icon} Achievement unlocked: ${def.name}!`, 'success', '🏆');
        }, 1500 + i * 800);
      }
    });

    // Fire confetti for exceptional scores
    if (percentile >= 85) {
      setTimeout(() => fireConfetti(), 600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `VIGILFI-${test.slug}-result.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast('Result card downloaded!', 'success', '📥');
    } catch (e) {
      console.error('Failed to generate image:', e);
      toast('Failed to download card', 'error', '❌');
    }
  }, [test.slug, toast]);

  const handleCopyLink = useCallback(() => {
    const url = `${window.location.origin}/challenge/${test.slug}?score=${score}`;
    navigator.clipboard.writeText(url);
    toast('Challenge link copied!', 'success', '🔗');
  }, [test.slug, score, toast]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/challenge/${test.slug}?score=${score}`;
    const text = `I scored ${score}${test.unit} on the ${test.name} test — Top ${100 - percentile}%! Can you beat me?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `VIGILFI — ${test.name}`, text, url });
      } catch { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`);
      toast('Challenge copied to clipboard!', 'success', '📋');
    }
  }, [score, test, percentile, toast]);

  return (
    <div className={styles.wrapper}>
      {/* The shareable card */}
      <div
        ref={cardRef}
        className={styles.card}
        style={{ '--result-color': barColor } as React.CSSProperties}
      >
        <div className={styles.cardHeader}>
          <span className={styles.brand}>🧠 VIGILFI</span>
          <span className={styles.testName}>{test.name}</span>
        </div>

        <div className={styles.scoreSection}>
          <div className={styles.scoreValue}>
            <AnimatedCounter value={score} duration={1400} suffix={test.unit} />
          </div>
          {subtitle && <p className={styles.scoreSubtitle}>{subtitle}</p>}
        </div>

        <div className={styles.percentileSection}>
          <div className={styles.percentileBar}>
            <div
              className={styles.percentileFill}
              style={{ width: `${percentile}%`, background: barColor }}
            />
          </div>
          <div className={styles.percentileInfo}>
            <span className={styles.percentileLabel} style={{ color: barColor }}>
              {label}
            </span>
            <span className={styles.percentileValue}>
              Top {Math.max(1, 100 - percentile)}%
            </span>
          </div>
        </div>

        <div className={styles.cardFooter}>
          Better than <strong>{percentile}%</strong> of people&nbsp;&nbsp;·&nbsp;&nbsp;vigilfi.com
        </div>
      </div>

      {/* Share buttons */}
      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={handleDownload}>
          <Download size={18} />
          Download Card
        </button>
        <button className={styles.actionBtn} onClick={handleCopyLink}>
          <Link2 size={18} />
          Copy Link
        </button>
        <button className={`${styles.actionBtn} ${styles.actionPrimary}`} onClick={handleShare}>
          <Share2 size={18} />
          Challenge a Friend
        </button>
      </div>
    </div>
  );
}
