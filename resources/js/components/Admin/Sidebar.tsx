import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar as SidebarUi, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { MessageCircleCodeIcon, UserCogIcon, UserIcon } from 'lucide-react';
import AppLogo from '../app-logo';
import { Link } from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    { href: route('admin.templates'), title: 'Templates', icon: MessageCircleCodeIcon },
    { href: route('admin.users'), title: 'Gebruikers', icon: UserIcon },
    { href: route('admin.roles'), title: 'Rollen', icon: UserCogIcon },
    { href: route('admin.roles'), title: 'Teams', icon: UserCogIcon },
    { href: route('admin.roles'), title: 'Rollen', icon: UserCogIcon },
    { href: route('admin.roles'), title: 'Rollen', icon: UserCogIcon },
];

export default function Sidebar() {
    return (
        <SidebarUi collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={ route('dashboard') }>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </SidebarUi>
    );
}
