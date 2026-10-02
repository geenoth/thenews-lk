import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'The News LK | News Around the Clock',
  description: 'The News LK brings news from Sri Lanka and around the world, all in one place.',
  metadataBase: new URL('https://thenews.lk'),
  alternates: {
    canonical: 'https://thenews.lk',
  },
  themeColor: '#009fe3',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://thenews.lk',
    title: 'The News LK | News Around the Clock',
    description: 'The News LK brings news from Sri Lanka and around the world, all in one place.',
    siteName: 'The News LK',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'The News LK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The News LK | News Around the Clock',
    description: 'The News LK brings news from Sri Lanka and around the world, all in one place.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'NewsMediaOrganization',
                  '@id': 'https://thenews.lk/#organization',
                  name: 'The News LK',
                  url: 'https://thenews.lk',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://thenews.lk/favicon.svg',
                  },
                  slogan: 'News Around the Clock',
                  sameAs: ['https://facebook.com/TheNewsLK.Sinhala'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://thenews.lk/#website',
                  url: 'https://thenews.lk',
                  name: 'The News LK',
                  description:
                    'The News LK brings news from Sri Lanka and around the world, all in one place.',
                  publisher: {
                    '@id': 'https://thenews.lk/#organization',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="h-full bg-[#f8fafc] text-[#1e293b] antialiased selection:bg-[#009fe3]/20 selection:text-[#009fe3]">
        {children}
      </body>
    </html>
  );
}
