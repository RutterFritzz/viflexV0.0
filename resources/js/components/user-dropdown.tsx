import { CircleUser } from "lucide-react";
import { Popover, PopoverContent } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

interface UserDropdownProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function UserDropdown({ open, onOpenChange }: UserDropdownProps) {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverContent>
                <div className="flex flex-row gap-2 items-center p-2 hover:bg-gray-100 rounded-md">
                    <Skeleton className="w-[26px] h-[26px] rounded-full" />
                    <Skeleton className="w-[100px] h-[26px] rounded-md" />
                </div>
            </PopoverContent>
        </Popover>
    )
}