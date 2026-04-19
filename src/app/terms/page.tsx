import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service — VIGILFI',
  description: 'VIGILFI terms of service. Free brain testing platform terms and conditions.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: April 2026</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using VIGILFI (&quot;the Service&quot;), available at vigilfi.com, 
              you agree to be bound by these Terms of Service. If you do not agree to these 
              terms, please do not use the Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Description of Service</h2>
            <p>
              VIGILFI provides free online cognitive tests including reaction time, typing 
              speed, memory, and perception tests. All tests run entirely in your web 
              browser. The Service is provided &quot;as is&quot; and is free to use.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Use of the Service</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to interfere with or disrupt the Service</li>
              <li>Use automated systems or bots to access the Service</li>
              <li>Attempt to reverse engineer any part of the Service</li>
              <li>Use the Service to harass, abuse, or harm others</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Test Results Disclaimer</h2>
            <p>
              The cognitive tests provided by VIGILFI are for <strong>entertainment and 
              educational purposes only</strong>. They are not medical or diagnostic tools. 
              Test results should not be used to diagnose any medical condition, cognitive 
              disorder, or disability.
            </p>
            <p>
              Percentile rankings are approximate estimates based on published research 
              averages and do not represent clinical assessments. If you have concerns 
              about your cognitive health, please consult a qualified healthcare professional.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Intellectual Property</h2>
            <p>
              The Service, including its design, code, text content, and branding, is owned 
              by VIGILFI and is protected by intellectual property laws. You may share your 
              test results and result cards freely, but you may not reproduce, distribute, 
              or create derivative works of the Service itself without permission.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Advertisements</h2>
            <p>
              The Service may display third-party advertisements. We are not responsible 
              for the content, accuracy, or practices of any third-party advertisers. Your 
              interactions with advertisers are solely between you and the advertiser.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, VIGILFI shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising 
              from your use of the Service. The Service is provided &quot;as is&quot; without 
              warranties of any kind, either express or implied.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be 
              effective immediately upon posting to this page. Your continued use of the 
              Service after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:hello@vigilfi.com" className={styles.link}>hello@vigilfi.com</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
