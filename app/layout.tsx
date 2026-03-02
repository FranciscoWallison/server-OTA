import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OTA Server',
  description: 'Over-The-Air update server for Capacitor hybrid apps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f5f5f5', color: '#333' }}>
        {children}
      </body>
    </html>
  );
}
