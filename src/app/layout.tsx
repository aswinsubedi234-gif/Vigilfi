import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "VIGILFI — Test Your Brain. Challenge Your Friends.",
  description: "Free online brain tests: reaction time, typing speed, memory, color perception, sequence memory, spatial reasoning & more. No sign-up. Instant results. Challenge friends.",
  keywords: "brain test, reaction time test, typing speed test, memory test, cognitive test, brain age, human benchmark alternative, free brain games, IQ test, chimp test, color perception test, sequence memory",
  metadataBase: new URL("https://vigilfi.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VIGILFI — Test Your Brain. Challenge Your Friends.",
    description: "9 free brain tests with shareable results. Reaction time, typing speed, memory & more. How fast is your brain?",
    type: "website",
    siteName: "VIGILFI",
    url: "https://vigilfi.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIGILFI — Test Your Brain",
    description: "9 free brain tests with shareable results. How fast is your brain?",
    creator: "@vigilfi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VIGILFI",
  url: "https://vigilfi.com",
  description: "Free online brain tests with shareable results. Reaction time, typing speed, memory & more.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://vigilfi.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
