'use client'; // Client Component

import { Provider } from 'react-redux';
import localFont from 'next/font/local';
import './globals.css';
import { store } from './store';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </div>
    </Provider>
  );
}
