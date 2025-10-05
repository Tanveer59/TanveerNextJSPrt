import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/redux/Provider';
import Menu from '@/components/menu/Menu';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tanveer Ahmad - Web Developer',
  description: 'Portfolio website of Tanveer Ahmad, a web developer specializing in Next.js and WordPress development.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Menu />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
