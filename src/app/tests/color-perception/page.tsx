import type { Metadata } from 'next';
import ColorPerceptionTest from './ColorPerceptionTest';

export const metadata: Metadata = {
  title: 'Color Perception Test — How Well Can Your Eyes See? | VIGILFI',
  description: 'Test your color perception by finding the tile with a slightly different shade. Each level gets harder. Only 2% of people reach level 30.',
  keywords: 'color perception test, color vision test, color blindness test, eye test online, color sensitivity test',
};

export default function ColorPerceptionPage() {
  return <ColorPerceptionTest />;
}
