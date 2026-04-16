import type { Metadata } from 'next';
import SequenceMemoryTest from './SequenceMemoryTest';

export const metadata: Metadata = {
  title: 'Sequence Memory Test — VIGILFI',
  description: 'Test your sequential memory. Watch the pattern of tiles that light up and repeat it. Free online sequence memory test with shareable results.',
  keywords: 'sequence memory test, simon says game, pattern memory, working memory test, cognitive test',
};

export default function SequenceMemoryPage() {
  return <SequenceMemoryTest />;
}
