import { Link, usePage } from "@inertiajs/react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HomeIcon, UsersIcon, TrophyIcon, UserIcon, SettingsIcon, LogOutIcon, SearchIcon } from "lucide-react";
import { SharedData } from "@/types";
import { useEffect, useState } from "react";
import CtrlShortcut from "./ctrl-shortcut";
import AppLogoIcon from "./app-logo-icon";
import { useTranslation } from "react-i18next";

export function Header() {
    const { t } = useTranslation();
    const { auth } = usePage<SharedData>().props;
    const [searchOpen, setSearchOpen] = useState(false);

    // Add keyboard shortcut listener
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95">
                <div className="container mx-auto h-16 flex items-center justify-between">
                    {/* Logo/Brand Section */}
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2 ml-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <AppLogoIcon className="w-8 h-8" />
                            </div>
                            <span className="text-xl font-bold text-foreground">Viflex</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-muted-foreground"
                                >
                                    <SearchIcon className="w-4 h-4 mr-2" />
                                    {t('searchTeamsClubsUsers')}
                                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                        <CtrlShortcut />
                                    </kbd>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="start">
                                <div className="flex flex-col">
                                    <div className="flex items-center border-b px-3">
                                        <SearchIcon className="w-4 h-4 mr-2 shrink-0 opacity-50" />
                                        <input
                                            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={t('searchTeamsClubsUsers')}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        <div className="p-2">
                                            {/* Teams Section */}
                                            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{t('teams')}</div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">
                                                    <UsersIcon className="w-4 h-4" />
                                                    <span>{t('searchTeams')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">
                                                    <TrophyIcon className="w-4 h-4" />
                                                    <span>{t('myTeams')}</span>
                                                </div>
                                            </div>

                                            {/* Clubs Section */}
                                            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-4">{t('clubs')}</div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">
                                                    <TrophyIcon className="w-4 h-4" />
                                                    <span>{t('searchClubs')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">
                                                    <HomeIcon className="w-4 h-4" />
                                                    <span>{t('myClubs')}</span>
                                                </div>
                                            </div>

                                            {/* Users Section */}
                                            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-4">{t('users')}</div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">
                                                    <UserIcon className="w-4 h-4" />
                                                    <span>{t('searchUsers')}</span>
                                                </div>
                                            </div>

                                            {/* No results state - you can show this conditionally */}
                                            {/* <div className="py-6 text-center text-sm text-muted-foreground">
                                                No results found.
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Main Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {/* Dashboard Menu */}
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent border-none hover:bg-accent">
                                        <HomeIcon className="w-4 h-4 mr-2" />
                                        {t('dashboard')}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-4 w-48">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/"
                                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                                                >
                                                    <HomeIcon className="w-4 h-4" />
                                                    <span>{t('overview')}</span>
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                                                >
                                                    <TrophyIcon className="w-4 h-4" />
                                                    <span>{t('myActivities')}</span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Teams Menu */}
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent border-none hover:bg-accent">
                                        <UsersIcon className="w-4 h-4 mr-2" />
                                        {t('teams')}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-4 w-48">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/team"
                                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                                                >
                                                    <UsersIcon className="w-4 h-4" />
                                                    <span>{t('allTeams')}</span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Clubs Menu */}
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent border-none hover:bg-accent">
                                        <TrophyIcon className="w-4 h-4 mr-2" />
                                        {t('clubs')}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-4 w-48">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/club"
                                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                                                >
                                                    <TrophyIcon className="w-4 h-4" />
                                                    <span>{t('allClubs')}</span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-transparent border-none hover:bg-accent">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                                                        {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="hidden sm:block text-sm font-medium">
                                                    {auth.user.name}
                                                </span>
                                            </div>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="grid gap-1 p-2 w-56">
                                                <div className="px-3 py-2">
                                                    <p className="text-sm font-medium">{auth.user.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {auth.user.email}
                                                    </p>
                                                </div>
                                                <Separator />
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/settings/profile"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                                                    >
                                                        <UserIcon className="w-4 h-4" />
                                                        <span>{t('profile')}</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/settings"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                                                    >
                                                        <SettingsIcon className="w-4 h-4" />
                                                        <span>{t('settings')}</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                                <Separator />
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-left w-full"
                                                    >
                                                        <LogOutIcon className="w-4 h-4" />
                                                        <span>{t('logout')}</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/login">{t('login')}</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">{t('signUp')}</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}