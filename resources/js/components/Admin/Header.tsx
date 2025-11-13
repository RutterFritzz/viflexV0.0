import { FileIcon, LogOut, MailIcon, Menu, Settings, User, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { Button } from "../ui/button";
// import Searchbar from "../Assets/Searchbar";
import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
    user?: string,
    title?: any,
    badge?: string,
    color?: string,
    modelName?: string,
}

export default function Header({ title, modelName }: HeaderProps) {
    const user = usePage<SharedData>().props.auth.user;

    const menuItems = [
        { path: "settings.profile", url: "profile", label: "Profiel", icon: User2 },
    ]

    return (
        <div className="grid grid-cols-12 items-center gap-y-3 py-2">
            <div className="col-span-full flex justify-between md:col-span-6 xl:col-span-4 items-center">
                <div className="flex gap-2 items-center">
                    <SidebarTrigger />
                    <h1 className="text-xl lg:text-2xl font-medium leading-tight tracking-tight text-gray-900 ">
                        {title}
                    </h1>
                </div>


                {/*  mobiel  */}
                <div className="flex md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Menu />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {menuItems.map((item, index) => (
                                <DropdownMenuItem key={index}>
                                    <Link href={route(item.path)}>
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            {/* {!!user?.is_admin && ( */}
                                <Link href={route("admin.users")}>
                                    <DropdownMenuItem>
                                        <Settings />
                                        <span>Admin</span>
                                    </DropdownMenuItem>
                                </Link>
                            {/* )} */}
                            <DropdownMenuItem>
                                <Link href={route("logout")} method="post" as="button">
                                    Log uit
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* {modelName && (
                // <div className="col-span-full md:col-span-6 xl:col-span-4">
                //     <Searchbar modelName={modelName} />
                // </div>
            )} */}

            <div className="col-start-12 hidden md:flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <User />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>
                            My account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {menuItems.map((item, index) => (
                                <Link key={index} href={route(item.path)}>
                                    <DropdownMenuItem>
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.label}</span>
                                    </DropdownMenuItem>
                                </Link>
                            ))}

                            {/* {!!user?.is_admin && ( */}
                                <Link href={route("admin.users")}>
                                    <DropdownMenuItem>
                                        <Settings />
                                        <span>Admin</span>
                                    </DropdownMenuItem>
                                </Link>
                            {/* )} */}
                            <DropdownMenuSeparator />
                            <Link href={route("logout")} method="post" as="button">
                                <DropdownMenuItem>
                                    <LogOut />
                                    <span>Uitloggen</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div >
    );
}
