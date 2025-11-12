import { Link, usePage } from '@inertiajs/react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminSidebar() {
    const pathname = window.location.pathname;

    const { url } = usePage();
    const { open } = useSidebar()

    const isActive = (path: string) => {
        const current = pathname.split('/').slice(0, 3).join('/');
        const target = path.split('/').slice(0, 3).join('/');

        return current === target;
    };

    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        // { active: '/admin', href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        // { active: '/admin/projecten', href: route('admin.projects.index'), label: 'Projecten', icon: FolderKanbanIcon },
        // { active: '/admin/taken', href: route('admin.tasks.index'), label: 'Taken', icon: ListTodoIcon },
        // { active: '/admin/tickets', href: route('admin.tickets'), label: 'Tickets', icon: TicketIcon },
        // { active: '/admin/issues', href: route('admin.issues'), label: 'Issue', icon: BugIcon },
        // { active: '/admin/uren', href: route('admin.hours.index'), label: 'Uren', icon: HourglassIcon },
        // { active: '/admin/berichten', href: route('admin.conversations'), label: 'Chat', icon: MessageCircleIcon },
        // { active: '/admin/instellingen', href: route('admin.settings'), label: 'Instellingen', icon: SettingsIcon },
    ];

    const [issues, setIssues] = useState(0);
    const [tickets, setTickets] = useState(0);

    const fetchIssues = async () => {
        try {
            const response = await axios.get(route('api.tickets.getIssues'));
            setIssues(response.data.amount);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const fetchTickets = async () => {
        try {
            const response = await axios.get(route('api.tickets.getOpenTickets'));
            setTickets(response.data.amount);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchIssues();
        fetchTickets();
        if (url.startsWith(`/admin/instellingen`)) {
            setIsOpen(true);
        }
    }, []);

    const urlSegments = url.split('/').filter(Boolean);
    const activeType = urlSegments[2] ?? '';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className='bg-neutral-900'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {!open ?
                            <img src="/images/logo_icon.gif" />
                            : <div className="px-2 mb-2">
                                {/* <ApplicationLogo variant='white' className='object-cover h-8 w-auto' /> */}
                            </div>
                        }
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='bg-neutral-900 text-white'>
                <SidebarGroup className="px-2 py-0">
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            return (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item?.active)}
                                        tooltip={{ children: item.label }}
                                    >
                                        <Link href={item.href}>
                                            {item.icon && <item.icon />}
                                            <span className='flex gap-2 items-center'>
                                                {item.label}
                                                {["Issue", "Tickets"].includes(item.label) && (issues > 0 || tickets > 0) && (
                                                    <span className="bg-red-500 text-white text-xs size-5 flex items-center justify-center rounded-full">
                                                        {item.label === "Issue" ? issues : tickets}
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
