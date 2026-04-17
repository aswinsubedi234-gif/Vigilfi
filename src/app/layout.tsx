import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "VIGILFI — Test Your Brain. Challenge Your Friends.",
  description: "Free online brain tests: reaction time, typing speed, memory, color perception & more. See how you compare. Share your scores. Challenge your friends.",
  keywords: "brain test, reaction time test, typing speed test, memory test, cognitive test, brain age, human benchmark alternative",
  openGraph: {
    title: "VIGILFI — Test Your Brain",
    description: "Free brain tests with shareable results. How fast is your brain?",
    type: "website",
    siteName: "VIGILFI",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIGILFI — Test Your Brain",
    description: "Free brain tests with shareable results. How fast is your brain?",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
