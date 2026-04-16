'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, Trophy, Target, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { TESTS } from '@/lib/tests';
import {
  getScoreHistory,
  getTestHistory,
  getBestScore,
  getTotalTestsTaken,
  getStreak,
  getAchievements,
  type ScoreEntry,
  type Achievement,
} from '@/lib/storage';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<ScoreEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streakData, setStreakData] = useState({ currentStreak: 0, longestStreak: 0, lastDate: '' });
  const [totalTests, setTotalTests] = useState(0);

  useEffect(() => {
    setMounted(true);
    setHistory(getScoreHistory());
    setAchievements(getAchievements());
    setStreakData(getStreak());
    setTotalTests(getTotalTestsTaken());
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Tests
          </Link>
          <h1 className={styles.title}>Your <span className="gradient-text">Dashboard</span></h1>
          <p className={styles.subtitle}>Track your progress and unlock achievements.</p>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Target size={22} /></div>
            <div className={styles.statValue}>{totalTests}</div>
            <div className={styles.statLabel}>Tests Taken</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.fireStatIcon}`}><Flame size={22} /></div>
            <div className={styles.statValue}>{streakData.currentStreak}</div>
            <div className={styles.statLabel}>Day Streak</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><TrendingUp size={22} /></div>
            <div className={styles.statValue}>{streakData.longestStreak}</div>
            <div className={styles.statLabel}>Best Streak</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Trophy size={22} /></div>
            <div className={styles.statValue}>{unlockedCount}/{achievements.length}</div>
            <div className={styles.statLabel}>Badges</div>
          </div>
        </div>

        {/* Best Scores */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Best Scores</h2>
          <div className={styles.bestGrid}>
            {TESTS.map(test => {
              const best = getBestScore(test.id, test.higherIsBetter);
              const testHistory = getTestHistory(test.id);
              return (
                <Link key={test.id} href={`/tests/${test.slug}`} className={styles.bestCard}>
                  <div className={styles.bestIcon}>{test.icon}</div>
                  <div className={styles.bestInfo}>
                    <h3 className={styles.bestName}>{test.name}</h3>
                    {best ? (
                      <div className={styles.bestScore}>
                        <span className={styles.bestValue}>{best.score}{test.unit}</span>
                        <span className={styles.bestMeta}>{testHistory.length} attempts</span>
                      </div>
                    ) : (
                      <span className={styles.bestEmpty}>Not attempted</span>
                    )}
                  </div>
                  {/* Mini sparkline */}
                  {testHistory.length >= 2 && (
                    <div className={styles.sparkline}>
                      <Sparkline data={testHistory.map(e => e.score)} higherIsBetter={test.higherIsBetter} />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Achievements */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Achievements</h2>
          <div className={styles.achievementsGrid}>
            {achievements.map(a => (
              <div key={a.id} className={`${styles.badge} ${a.unlocked ? styles.badgeUnlocked : styles.badgeLocked}`}>
                <span className={styles.badgeIcon}>{a.unlocked ? a.icon : '🔒'}</span>
                <div>
                  <h4 className={styles.badgeName}>{a.name}</h4>
                  <p className={styles.badgeDesc}>{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent History */}
        {history.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.historyList}>
              {history.slice(-15).reverse().map((entry, i) => {
                const test = TESTS.find(t => t.id === entry.testId);
                if (!test) return null;
                const date = new Date(entry.date);
                return (
                  <div key={i} className={styles.historyItem}>
                    <span className={styles.historyIcon}>{test.icon}</span>
                    <span className={styles.historyName}>{test.name}</span>
                    <span className={styles.historyScore}>{entry.score}{test.unit}</span>
                    <span className={styles.historyPercentile}>Top {Math.max(1, 100 - entry.percentile)}%</span>
                    <span className={styles.historyDate}>
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {totalTests === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🧠</div>
            <h3>No tests taken yet</h3>
            <p>Take your first test to start tracking your progress!</p>
            <Link href="/#tests" className={styles.emptyBtn}>Browse Tests →</Link>
          </div>
        )}
      </main>
    </>
  );
}

// Simple SVG sparkline component
function Sparkline({ data, higherIsBetter }: { data: number[], higherIsBetter: boolean }) {
  const last10 = data.slice(-10);
  const min = Math.min(...last10);
  const max = Math.max(...last10);
  const range = max - min || 1;
  const h = 30;
  const w = 80;

  const points = last10.map((v, i) => {
    const x = (i / (last10.length - 1)) * w;
    let y = h - ((v - min) / range) * (h - 4) - 2;
    if (!higherIsBetter) y = h - y; // Invert for lower-is-better
    return `${x},${y}`;
  }).join(' ');

  const isImproving = higherIsBetter
    ? last10[last10.length - 1] >= last10[0]
    : last10[last10.length - 1] <= last10[0];
  const color = isImproving ? '#00b894' : '#e74c3c';

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity={0.8}
      />
    </svg>
  );
}
