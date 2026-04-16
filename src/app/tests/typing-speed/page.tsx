import type { Metadata } from 'next';
import TypingSpeedTest from './TypingSpeedTest';

export const metadata: Metadata = {
  title: 'Typing Speed Test — Free WPM Test Online | VIGILFI',
  description: 'Test your typing speed with this free online WPM test. See your words per minute, accuracy, and how you compare to the global average of 42 WPM.',
  keywords: 'typing speed test, WPM test, words per minute test, typing test online, free typing test, keyboard speed test',
};

export default function TypingSpeedPage() {
  return <TypingSpeedTest />;
}
