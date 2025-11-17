import { Head, Link } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/Admin/Sidebar";
import { Toaster } from "sonner";
import FlashHandler from "@/Handlers/Toaster";
import MainLayout from "./MainLayout";
import { NavMain } from "@/components/nav-main";
import { NavItem } from "@/types";
import { MessageCircleCodeIcon, UserCogIcon, UserIcon } from 'lucide-react';
import { Card } from "@/components/ui/card";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const mainNavItems =[
    { href: route('admin.templates'), title: 'Templates', icon: MessageCircleCodeIcon },
    { href: route('admin.users'), title: 'Gebruikers', icon: UserIcon },
    { href: route('admin.roles'), title: 'Rollen', icon: UserCogIcon },
    { href: route('admin.teams'), title: 'teams', icon: UserCogIcon }
];

export default function AdminLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <MainLayout>
            <Head title={title ? `${title} - ${appName}` : appName} />

            <Toaster richColors closeButton />
            <FlashHandler />

            <div className="grid grid-cols-12 gap-x-4 m-8">
                <div className="col-span-2 grid">
                    <Card className="px-4">
                        {mainNavItems.map((navItem, index) => (
                            <Link href={navItem.href} key={index}>{navItem.title}</Link>
                        ))}
                    </Card>
                </div>

                <div className="col-span-10">
                    {children}
                </div>

            </div>

        </MainLayout>
    );
}
