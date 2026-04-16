import type { Metadata } from 'next';
import ReactionTimeTest from './ReactionTimeTest';

export const metadata: Metadata = {
  title: 'Reaction Time Test — Free Online | VIGILFI',
  description: 'Test your reaction time with this free online tool. See how fast you can respond to visual stimuli. Average human reaction time is 273ms. What\'s yours?',
  keywords: 'reaction time test, reaction speed test, reflex test, human reaction time, reaction test online',
};

export default function ReactionTimePage() {
  return <ReactionTimeTest />;
}
