import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Dashboard — VIGILFI',
  description: 'Track your cognitive test progress, scores, streaks, and achievements.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
