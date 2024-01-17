import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Manual interview assignment',
    description: 'Landing page and quiz'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
