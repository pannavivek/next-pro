import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
 
export const metadata: Metadata = {
  title: 'StudioMark — Strategy, Design & Growth',
  description:
    'A strategy and design partner for businesses building their next chapter.',
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}