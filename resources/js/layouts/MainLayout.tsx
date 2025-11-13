import { Header } from "@/components/Header";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import FlashHandler from "@/Handlers/Toaster";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 min-h-[calc(100vh-4rem)]">
                <Toaster richColors closeButton />
                <FlashHandler />

                {children}
            </main>
            <Footer />
        </div>
    )
}
