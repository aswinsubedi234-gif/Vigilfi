'use client';

import Link from 'next/link';
import { TESTS } from '@/lib/tests';
import styles from './TestGrid.module.css';

export default function TestGrid() {
  return (
    <div className={styles.grid}>
      {TESTS.map((test, i) => (
        <Link
          key={test.id}
          href={`/tests/${test.slug}`}
          className={`${styles.card} animate-fade-in-up stagger-${i + 1}`}
          style={{ '--test-color': test.color, '--test-glow': test.colorGlow } as React.CSSProperties}
        >
          <div className={styles.cardIcon}>{test.icon}</div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{test.name}</h3>
            <p className={styles.cardDesc}>{test.shortDescription}</p>
          </div>
          <div className={styles.cardMeta}>
            <span className={styles.cardBadge} data-cat={test.category}>{test.category}</span>
            <span className={styles.cardDuration}>{test.duration}</span>
          </div>
          <div className={styles.cardArrow}>→</div>
          <div className={styles.cardGlow} />
        </Link>
      ))}
    </div>
  );
}
