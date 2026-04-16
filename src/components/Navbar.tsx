'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isMuted, toggleMute, playClick } from '@/lib/sounds';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMuted(isMuted());
  }, []);

  const handleMuteToggle = () => {
    const newState = toggleMute();
    setMuted(newState);
    if (!newState) playClick(); // Play a sound when unmuting
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <div className={styles.logoIcon}>
            <Brain size={24} />
          </div>
          <span className={styles.logoText}>VIGILFI</span>
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          <Link
            href="/"
            className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Tests
          </Link>
          <Link
            href="/blog"
            className={`${styles.link} ${pathname?.startsWith('/blog') ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/dashboard"
            className={`${styles.link} ${pathname === '/dashboard' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </div>

        <div className={styles.rightControls}>
          <button
            className={styles.muteBtn}
            onClick={handleMuteToggle}
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
