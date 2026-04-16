import type { Metadata } from 'next';
import SpatialReasoningTest from './SpatialReasoningTest';

export const metadata: Metadata = {
  title: 'Spatial Reasoning & Mental Rotation Test — VIGILFI',
  description: 'Test your spatial intelligence and mental flexibility. Can you rapidly rotate complex 2D logic matrices in your mind? Free generalized IQ test.',
  keywords: 'spatial reasoning test, mental rotation test, spatial IQ, matrix rotation, fluid intelligence, cognitive brain test',
};

export default function SpatialReasoningPage() {
  return <SpatialReasoningTest />;
}
