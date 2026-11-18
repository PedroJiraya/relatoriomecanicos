import './globals.css';

export const metadata = {
  title: 'Relatório de Turno – Manutenção Mecânica | Sotreq CAT',
  description: 'Relatório de turno de manutenção mecânica convencional para caminhões e frotas de mina.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
