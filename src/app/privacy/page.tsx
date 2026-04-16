import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — VIGILFI',
  description: 'VIGILFI privacy policy. We don\'t collect, store, or sell your personal data. All tests run entirely in your browser.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: April 2026</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Overview</h2>
            <p>
              VIGILFI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we handle information when you use our website 
              at vigilfi.com (the &quot;Service&quot;).
            </p>
            <p>
              <strong>The short version:</strong> We don&apos;t collect your personal data. 
              All cognitive tests run entirely in your browser. No test results are sent to 
              our servers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Information We Don&apos;t Collect</h2>
            <ul>
              <li>We do <strong>not</strong> require user accounts or registration</li>
              <li>We do <strong>not</strong> store your test results or scores</li>
              <li>We do <strong>not</strong> use cookies for tracking purposes</li>
              <li>We do <strong>not</strong> sell any data to third parties</li>
              <li>We do <strong>not</strong> use fingerprinting or similar tracking technologies</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>How Our Tests Work</h2>
            <p>
              All cognitive tests on VIGILFI run 100% client-side using JavaScript in your 
              web browser. Your test results are calculated locally on your device and are 
              never transmitted to our servers. When you close the browser tab, your results 
              are gone unless you chose to download or share them.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Advertising</h2>
            <p>
              We may display advertisements through third-party ad networks (such as Google 
              AdSense) to support the free operation of VIGILFI. These ad networks may use 
              cookies and similar technologies to serve ads based on your browsing activity 
              across websites. This is governed by the respective ad network&apos;s privacy 
              policies.
            </p>
            <p>
              You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Google&apos;s Ad Settings
              </a>{' '}
              or{' '}
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                AboutAds.info
              </a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Analytics</h2>
            <p>
              We may use privacy-respecting analytics tools to understand general usage 
              patterns (such as page views and general geographic regions). These analytics 
              do not identify individual users and do not track personal information.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Sharing Features</h2>
            <p>
              When you use the &quot;Share&quot; or &quot;Challenge a Friend&quot; features, 
              a URL is generated that may contain your test score as a URL parameter. Sharing 
              this URL is entirely your choice. We do not store or log shared URLs on our 
              servers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Children&apos;s Privacy</h2>
            <p>
              VIGILFI does not knowingly collect information from children under 13. Our 
              service does not require any personal information to use.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              any changes by posting the new Privacy Policy on this page and updating the 
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@vigilfi.com" className={styles.link}>hello@vigilfi.com</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
