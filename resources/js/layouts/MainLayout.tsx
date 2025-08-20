import { Header } from "@/components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 min-h-[calc(100vh-4rem)]">
                {children}
            </main>
            <Footer />
        </div>
    )
}