import './globals.css';
import PwaSupport from '../src/components/common/PwaSupport';

export const metadata = {
  title: 'Relatório de Turno – Manutenção Mecânica | Sotreq CAT',
  description:
    'Relatório de turno de manutenção mecânica convencional para caminhões e frotas de mina.',
  manifest: '/manifest.json',
  themeColor: '#ffcd00',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Relatório Mec',
  },
  icons: {
    icon: '/icon-192.svg',
    apple: '/icon-192.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffcd00',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffcd00" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Relatório Mec" />
      </head>
      <body>
        {children}
        <PwaSupport />
      </body>
    </html>
  );
}
