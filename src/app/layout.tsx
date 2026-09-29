import type { Metadata } from 'next';
import './global.css';
import { Providers } from '@/components/shared/Providers';

export const metadata: Metadata = {
  title: 'AADHYA ENTERPRISES | Classical Ayurvedic Formulations From Hathras',
  description: 'Pure classical Ayurvedic herbals, churnas, medicated tailas, and rasayanas formulated in Hathras, Uttar Pradesh. AYUSH & GMP compliant.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-[#FAF7F2] text-[#1F2937] selection:bg-[#1B4332] selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
