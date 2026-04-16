import type { Metadata } from 'next';
import ChimpTest from './ChimpTest';

export const metadata: Metadata = {
  title: 'Chimp Memory Test — VIGILFI',
  description: 'Can you beat a chimpanzee? Test your visual working memory and spatial sequence recall in this elite cognitive benchmark.',
  keywords: 'chimp test, chimpanzee working memory, visual memory test, brain capacity, human benchmark chimp',
};

export default function ChimpTestPage() {
  return <ChimpTest />;
}
