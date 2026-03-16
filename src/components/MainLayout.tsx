import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<Navbar />
			<main className="p-2 flex-1">{children}</main>
			<Footer />
		</div>
	);
}
