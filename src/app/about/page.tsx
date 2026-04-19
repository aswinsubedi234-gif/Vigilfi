import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About VIGILFI — Free Brain Testing Platform',
  description: 'VIGILFI is a free online brain testing platform. Test your reaction time, typing speed, memory, and cognitive abilities. No sign-up required.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            About <span className="gradient-text">VIGILFI</span>
          </h1>
          <p className={styles.subtitle}>
            Free brain tests for everyone. No sign-up. No data collection. Just science.
          </p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>What is VIGILFI?</h2>
            <p>
              VIGILFI is a free online platform for testing your cognitive abilities. 
              We offer a growing collection of precision brain tests including reaction time, 
              typing speed, number memory, visual memory, color perception, and sequence memory.
            </p>
            <p>
              Every test runs entirely in your browser. We don&apos;t store your data, 
              require an account, or track your results. Your scores are yours — share them 
              with beautiful downloadable result cards or challenge your friends directly.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Why We Built This</h2>
            <p>
              We believe cognitive testing should be accessible, beautiful, and free. 
              Most brain testing sites are cluttered with ads, require sign-ups, or look 
              like they were designed in 2005. VIGILFI is different — it&apos;s fast, 
              modern, and respects your privacy.
            </p>
          </section>

          <section className={styles.section}>
            <h2>The Science</h2>
            <p>
              Our tests are based on established cognitive science research. Reaction time 
              tests measure processing speed. Memory tests assess working memory capacity, 
              following Miller&apos;s Law (the average person can hold 7±2 items in working 
              memory). Color perception tests evaluate visual discrimination ability.
            </p>
            <p>
              Percentile rankings are calculated using approximate normal distributions 
              based on published research data. They provide a rough estimate of how your 
              score compares to the general population.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Privacy First</h2>
            <div className={styles.privacyGrid}>
              <div className={styles.privacyItem}>
                <span className={styles.privacyIcon}>🔒</span>
                <h3>No Accounts</h3>
                <p>No sign-up, no login, no email required.</p>
              </div>
              <div className={styles.privacyItem}>
                <span className={styles.privacyIcon}>🚫</span>
                <h3>No Data Storage</h3>
                <p>Your scores are never sent to any server.</p>
              </div>
              <div className={styles.privacyItem}>
                <span className={styles.privacyIcon}>⚡</span>
                <h3>100% Client-Side</h3>
                <p>Everything runs in your browser. Nothing leaves your device.</p>
              </div>
              <div className={styles.privacyItem}>
                <span className={styles.privacyIcon}>📱</span>
                <h3>Works Everywhere</h3>
                <p>Desktop, tablet, mobile — no app download needed.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Contact</h2>
            <p>
              Have feedback, suggestions, or found a bug? We&apos;d love to hear from you.
            </p>
            <p>
              Email: <a href="mailto:hello@vigilfi.com" className={styles.link}>hello@vigilfi.com</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
