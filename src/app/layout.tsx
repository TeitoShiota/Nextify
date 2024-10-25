import type { Metadata } from "next";

import { ThemeProvider } from 'next-themes'

// import '@/styles/_colors.scss';
import "@/styles/globals.scss";
import Header from "@/containers/Header";
import Nav from "@/containers/Nav";

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
				<Header />
				{children}
				<Nav />
			</ThemeProvider>
		</body>
	</html>
	);
}
