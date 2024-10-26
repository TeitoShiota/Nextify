import Header from "@/containers/Header";
import Nav from "@/containers/Nav";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <>
			<Header />
			{children}
			<Nav />
        </>
	);
}
