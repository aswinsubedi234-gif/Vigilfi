'use client';

import styles from './AdSlot.module.css';

interface AdSlotProps {
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

/**
 * AdSlot — Placeholder for Google AdSense ads
 * 
 * Replace the placeholder content with actual AdSense code once approved:
 * 
 * <ins class="adsbygoogle"
 *   style="display:block"
 *   data-ad-client="ca-pub-XXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"
 *   data-ad-format="auto"
 *   data-full-width-responsive="true">
 * </ins>
 * <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 */
export default function AdSlot({ format = 'horizontal', className = '' }: AdSlotProps) {
  return (
    <div className={`${styles.slot} ${styles[format]} ${className}`} aria-hidden="true">
      <div className={styles.inner}>
        <span className={styles.label}>Advertisement</span>
      </div>
    </div>
  );
}
