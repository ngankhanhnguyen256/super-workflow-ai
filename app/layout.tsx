import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Super Workflow AI',
  description: 'AI Workflow Builder'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
