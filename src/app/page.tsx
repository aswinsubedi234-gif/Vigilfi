'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Trophy, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import NeuralBackground from '@/components/NeuralBackground';
import TestGrid from '@/components/TestGrid';
import { TESTS } from '@/lib/tests';
import { getStreak, getTotalTestsTaken, getAchievements, getDailyChallenge, hasCompletedDailyChallenge } from '@/lib/storage';
import styles from './page.module.css';

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [totalTests, setTotalTests] = useState(0);
  const [achievementCount, setAchievementCount] = useState(0);
  const [dailyTest, setDailyTest] = useState<typeof TESTS[0] | null>(null);
  const [dailyDone, setDailyDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = getStreak();
    setStreak(s.currentStreak);
    setTotalTests(getTotalTestsTaken());
    setAchievementCount(getAchievements().filter(a => a.unlocked).length);
    
    const daily = getDailyChallenge();
    setDailyTest(TESTS.find(t => t.id === daily.testId) || null);
    setDailyDone(hasCompletedDailyChallenge());
  }, []);

  return (
    <>
      <NeuralBackground />
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Free &middot; No Sign-Up &middot; Instant Results
            </div>
            <h1 className={styles.heroTitle}>
              Test Your <span className="gradient-text">Brain</span>.
              <br />
              Challenge Your <span className="gradient-text-warm">Friends</span>.
            </h1>
            <p className={styles.heroSubtitle}>
              Precision cognitive tests that measure what matters. Get your scores,
              see how you rank, and share beautiful result cards.
            </p>

            {/* Live Stats */}
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>7</span>
                <span className={styles.heroStatLabel}>Tests</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>100%</span>
                <span className={styles.heroStatLabel}>Free</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>0</span>
                <span className={styles.heroStatLabel}>Data Stored</span>
              </div>
            </div>

            {/* User engagement bar — only shown if they've started testing */}
            {mounted && totalTests > 0 && (
              <div className={styles.engagementBar}>
                {streak > 0 && (
                  <div className={styles.engagementItem}>
                    <Flame size={16} className={styles.fireIcon} />
                    <span>{streak} day streak</span>
                  </div>
                )}
                <div className={styles.engagementItem}>
                  <Trophy size={16} />
                  <span>{achievementCount}/{15} badges</span>
                </div>
                <Link href="/dashboard" className={styles.engagementLink}>
                  View Progress <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Daily Challenge */}
        {dailyTest && (
          <section className={styles.dailySection}>
            <div className={styles.sectionContainer}>
              <Link
                href={`/tests/${dailyTest.slug}`}
                className={`${styles.dailyCard} ${dailyDone ? styles.dailyDone : ''}`}
              >
                <div className={styles.dailyLeft}>
                  <div className={styles.dailyBadge}>
                    <Calendar size={14} />
                    Daily Challenge
                  </div>
                  <h3 className={styles.dailyTitle}>
                    {dailyDone ? '✓ Completed' : `Today's Challenge: ${dailyTest.name}`}
                  </h3>
                  <p className={styles.dailyDesc}>
                    {dailyDone
                      ? 'Come back tomorrow for a new challenge!'
                      : dailyTest.shortDescription}
                  </p>
                </div>
                <div className={styles.dailyIcon}>{dailyTest.icon}</div>
              </Link>
            </div>
          </section>
        )}

        {/* Tests Grid */}
        <section className={styles.testsSection} id="tests">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Choose Your Test</h2>
              <p className={styles.sectionSubtitle}>
                Each test takes 30 seconds to 5 minutes. Results are instant and shareable.
              </p>
            </div>
            <TestGrid />
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How It Works</h2>
            </div>
            <div className={styles.howGrid}>
              <div className={styles.howCard}>
                <div className={styles.howNum}>1</div>
                <h3>Pick a Test</h3>
                <p>Choose from reaction time, memory, typing speed, and more cognitive challenges.</p>
              </div>
              <div className={styles.howCard}>
                <div className={styles.howNum}>2</div>
                <h3>Take the Challenge</h3>
                <p>Complete the test. No sign-up needed, no data stored. Everything runs in your browser.</p>
              </div>
              <div className={styles.howCard}>
                <div className={styles.howNum}>3</div>
                <h3>Get Your Score</h3>
                <p>See your precise results with percentile rankings and unlock achievement badges.</p>
              </div>
              <div className={styles.howCard}>
                <div className={styles.howNum}>4</div>
                <h3>Share &amp; Challenge</h3>
                <p>Download your result card or send a challenge link to see who scores higher.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>🧠 VIGILFI</span>
              <p>Free brain tests for everyone.</p>
            </div>
            <div className={styles.footerLinks}>
              <a href="/#tests">Tests</a>
              <a href="/blog">Blog</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/about">About</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
            <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} VIGILFI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
