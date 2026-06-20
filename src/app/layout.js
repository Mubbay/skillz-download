import './globals.css';

import prisma from '@/lib/prisma';

export async function generateMetadata() {
  let googleCode = '';
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'googleSearchConsoleCode' } });
    if (setting && setting.value) googleCode = setting.value;
  } catch (e) {
    // ignore
  }

  return {
    title: {
      default: 'Skillz Download — Free Online Video Downloader',
      template: '%s | Skillz Download',
    },
    description: 'Download videos from YouTube, TikTok, Facebook, Vimeo, Instagram and 1000+ sites for free. Fast, secure, and no registration required. For personal use only.',
    keywords: ['video downloader', 'youtube downloader', 'tiktok downloader', 'facebook video downloader', 'vimeo downloader', 'free video download', 'online video downloader'],
    authors: [{ name: 'Skillz Download' }],
    creator: 'Skillz Download',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://skillzdownload.name.ng',
      siteName: 'Skillz Download',
      title: 'Skillz Download — Free Online Video Downloader',
      description: 'Download videos from YouTube, TikTok, Facebook, Vimeo and 1000+ sites for free.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Skillz Download — Free Online Video Downloader',
      description: 'Download videos from YouTube, TikTok, Facebook, Vimeo and 1000+ sites for free.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: googleCode || undefined,
    },
  };
}

import TrackView from '@/components/TrackView';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body>
        <TrackView type="siteView" />
        {children}
      </body>
    </html>
  );
}
