import type { Metadata } from "next";

import { ThemeProvider } from 'next-themes'

// import '@/styles/_colors.scss';
import "@/styles/globals.scss";

export const metadata: Metadata = {
	title: "Nextify",
	description: "School project for integrating Spotify API",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
	<html lang="en">
		<body>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</body>
	</html>
	);
}
