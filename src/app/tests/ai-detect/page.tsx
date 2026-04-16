import type { Metadata } from 'next';
import AiDetectTest from './AiDetectTest';

export const metadata: Metadata = {
  title: 'AI or Human? Text Detection Test — VIGILFI',
  description: 'Can you tell if text was written by AI or a real human? Test your detection skills with 10 text snippets. Free AI detection brain test with shareable results.',
  keywords: 'ai detection test, ai or human, detect ai text, chatgpt detection, ai writing test, brain test',
};

export default function AiDetectPage() {
  return <AiDetectTest />;
}
