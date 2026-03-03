import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servidor OTA',
  description: 'Servidor de atualizações Over-The-Air para apps híbridos Capacitor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f5f5f5', color: '#333' }}>
        {children}
      </body>
    </html>
  );
}
