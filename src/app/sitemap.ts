import type { MetadataRoute } from 'next';

const BASE_URL = 'https://vigilfi.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tests = [
    'reaction-time',
    'typing-speed',
    'number-memory',
    'visual-memory',
    'color-perception',
    'sequence-memory',
    'ai-detect',
    'spatial-reasoning',
    'chimp-test',
  ];

  const blogSlugs = [
    // Original 7
    'how-to-improve-reaction-time',
    'average-typing-speed-by-age',
    'what-is-working-memory',
    'brain-age-what-it-means',
    'color-perception-human-eye',
    'chimp-capacity-and-visual-memory',
    'spatial-reasoning-and-stem-aptitude',
    // New 10
    'how-to-type-faster',
    'what-is-a-good-reaction-time',
    'brain-games-that-actually-work',
    'how-to-improve-memory',
    'ai-vs-human-writing',
    'average-reaction-time-gamers',
    'neuroplasticity-explained',
    'color-blindness-test-guide',
    'sequence-memory-and-iq',
    'digital-cognitive-assessment',
  ];

  const testPages = tests.map((slug) => ({
    url: `${BASE_URL}/tests/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const challengePages = tests.map((slug) => ({
    url: `${BASE_URL}/challenge/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...testPages,
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPages,
    ...challengePages,
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

