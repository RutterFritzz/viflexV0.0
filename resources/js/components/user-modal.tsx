import { User } from "@/types";
import { useState } from "react";
import { DialogContent, DialogTitle, DialogTrigger, Dialog, DialogHeader } from "@/components/ui/dialog";
import { CircleUser } from "lucide-react";

interface UserModalProps {
    user: User;
    children: React.ReactNode;
}

export default function UserModal({ user, children }: UserModalProps) {

    const [isOpen, setIsOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">User Modal</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex items-center gap-3">
                        <CircleUser className="h-10 w-10 text-gray-600" />
                        <div className="flex-1">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}