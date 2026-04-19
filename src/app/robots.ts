import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/_next/'],
      },
    ],
    sitemap: 'https://vigilfi.com/sitemap.xml',
  };
}

