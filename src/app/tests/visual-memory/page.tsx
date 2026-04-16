import type { Metadata } from 'next';
import VisualMemoryTest from './VisualMemoryTest';

export const metadata: Metadata = {
  title: 'Visual Memory Test — How Good Is Your Visual Memory? | VIGILFI',
  description: 'Test your visual memory by memorizing patterns on a grid. The grid grows larger each level. How far can you go?',
  keywords: 'visual memory test, pattern memory test, memory game online, brain memory test',
};

export default function VisualMemoryPage() {
  return <VisualMemoryTest />;
}
