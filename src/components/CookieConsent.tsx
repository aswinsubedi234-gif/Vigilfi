'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

const CONSENT_KEY = 'vigilfi_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay to not block initial render
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.content}>
        <p className={styles.text}>
          We use cookies for analytics and to serve relevant ads via Google AdSense. 
          Your test results are never sent to our servers.{' '}
          <a href="/privacy" className={styles.link}>Privacy Policy</a>
        </p>
        <div className={styles.actions}>
          <button className={styles.decline} onClick={handleDecline}>
            Decline
          </button>
          <button className={styles.accept} onClick={handleAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
