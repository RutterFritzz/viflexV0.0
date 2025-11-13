import { Head } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/Admin/Sidebar";
import { Toaster } from "sonner";
import FlashHandler from "@/Handlers/Toaster";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default function AdminLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <SidebarProvider defaultOpen={isOpen}>
            <Head title={title ? `${title} - ${appName}` : appName} />
            <Sidebar />

            <SidebarInset className="px-4 md:px-8">
                <Toaster richColors closeButton />
                <FlashHandler />

                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
