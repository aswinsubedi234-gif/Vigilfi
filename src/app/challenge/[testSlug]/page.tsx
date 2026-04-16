import type { Metadata } from 'next';
import { TESTS } from '@/lib/tests';
import ChallengeClient from './ChallengeClient';

interface Props {
  params: Promise<{ testSlug: string }>;
  searchParams: Promise<{ score?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { testSlug } = await params;
  const test = TESTS.find(t => t.slug === testSlug);
  const testName = test?.name || 'Brain Test';

  return {
    title: `Challenge — ${testName} — VIGILFI`,
    description: `Your friend challenged you to beat their ${testName} score! Take the test and see if you can win.`,
  };
}

export default async function ChallengePage({ params, searchParams }: Props) {
  const { testSlug } = await params;
  const { score } = await searchParams;
  const challengeScore = score ? parseInt(score, 10) : null;

  return <ChallengeClient testSlug={testSlug} challengeScore={challengeScore} />;
}
