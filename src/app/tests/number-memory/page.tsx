import type { Metadata } from 'next';
import NumberMemoryTest from './NumberMemoryTest';

export const metadata: Metadata = {
  title: 'Number Memory Test — How Many Digits Can You Remember? | VIGILFI',
  description: 'Test your short-term memory by remembering increasingly long numbers. The average person can remember 7 digits. How far can you go?',
  keywords: 'number memory test, digit span test, short term memory test, memory test online',
};

export default function NumberMemoryPage() {
  return <NumberMemoryTest />;
}
