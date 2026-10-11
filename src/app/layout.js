import './globals.css';
import SecurityWrapper from '@/components/SecurityWrapper';

export const metadata = {
  title: 'MP Store - Download Apps',
  description: 'Official App Store by MKCT Genix Software Solution',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </body>
    </html>
  );
}