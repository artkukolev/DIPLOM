import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'EduPlatform',
  description: 'Образовательная платформа нового поколения',
};

import Header from '../components/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="pt-16"> {/* space for fixed header */}
          {children}
        </main>
      </body>
    </html>
  );
}
