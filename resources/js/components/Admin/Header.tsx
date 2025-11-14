import { FileIcon, LogOut, MailIcon, Menu, Settings, User, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { Button } from "../ui/button";
// import Searchbar from "../Assets/Searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useInitials } from '@/hooks/use-initials';

interface HeaderProps {
    user?: string,
    title?: any,
    badge?: string,
    color?: string,
    modelName?: string,
}

export default function Header({ title, modelName }: HeaderProps) {
    const user = usePage<SharedData>().props.auth.user;
    const getInitials = useInitials();

    const menuItems = [
        { path: "settings.profile", url: "profile", label: "Profiel", icon: User2 },
    ]

    return (
        <div className="grid grid-cols-12 items-center gap-y-3">
            <div className="col-span-full flex justify-between md:col-span-6 xl:col-span-4 items-center">
                <div className="flex gap-2 items-center">
                    <h1 className="text-xl lg:text-2xl font-medium leading-tight tracking-tight text-gray-900 ">
                        {title}
                    </h1>
                </div>
            </div>

            {/* {modelName && (
                // <div className="col-span-full md:col-span-6 xl:col-span-4">
                //     <Searchbar modelName={modelName} />
                // </div>
            )} */}
        </div >
    );
}
