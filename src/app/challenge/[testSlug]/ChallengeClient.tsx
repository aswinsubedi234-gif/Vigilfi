'use client';

import Link from 'next/link';
import { Swords, ArrowRight } from 'lucide-react';
import { TESTS } from '@/lib/tests';
import Navbar from '@/components/Navbar';
import styles from './challenge.module.css';

interface ChallengeClientProps {
  testSlug: string;
  challengeScore: number | null;
}

export default function ChallengeClient({ testSlug, challengeScore }: ChallengeClientProps) {
  const test = TESTS.find(t => t.slug === testSlug);

  if (!test) {
    return (
      <>
        <Navbar />
        <main className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Test Not Found</h1>
            <p className={styles.subtitle}>This challenge link doesn&apos;t seem to be valid.</p>
            <Link href="/" className={styles.ctaBtn}>
              Browse All Tests <ArrowRight size={18} />
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Swords size={40} />
          </div>
          <h1 className={styles.title}>You&apos;ve Been Challenged!</h1>

          {challengeScore !== null && !isNaN(challengeScore) ? (
            <>
              <p className={styles.subtitle}>
                Your friend scored <strong className={styles.scoreHighlight}>{challengeScore}{test.unit}</strong> on the{' '}
                <strong>{test.name}</strong> test.
              </p>
              <p className={styles.taunt}>Can you beat them? 🤔</p>
            </>
          ) : (
            <p className={styles.subtitle}>
              Your friend challenged you to the <strong>{test.name}</strong> test.
              Show them what you&apos;ve got!
            </p>
          )}

          <div className={styles.testPreview}>
            <span className={styles.testIcon}>{test.icon}</span>
            <div>
              <h3 className={styles.testName}>{test.name}</h3>
              <p className={styles.testDesc}>{test.shortDescription}</p>
            </div>
          </div>

          <Link href={`/tests/${test.slug}`} className={styles.ctaBtn}>
            Accept Challenge <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </>
  );
}
