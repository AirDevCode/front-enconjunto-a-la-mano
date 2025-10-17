import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Head from 'next/head';
import React from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'Enconjunto Alamano',
  description: 'Enconjunto Alamano es una herramienta digital de intercambio de productos y servicios exclusiva para la comunidad Constructora Bolívar.',
  openGraph: {
    url: 'https://www.enconjuntoalamano.com/',
    images: ['https://www.enconjuntoalamano.com/wp-content/uploads/2023/10/cropped-logo.png'],
    type: 'article',
    title: 'Enconjunto Alamano',
    description: 'Enconjunto Alamano es una herramienta digital de intercambio de productos y servicios exclusiva para la comunidad Constructora Bolívar',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
      </Head>
      <body>{children}</body>
      <GoogleAnalytics gaId="GTM-KT339CRP" />
    </html>
  )
}