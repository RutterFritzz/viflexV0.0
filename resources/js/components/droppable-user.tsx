import { User } from "@/types";
import { CircleUser } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import DraggableUser from "@/components/draggable-user";
import { useEffect, useRef, useState } from "react";
import UserDropdown from "./user-dropdown";

interface DroppableUserProps {
    user: User | null;
    role: 'home_coach' | 'away_coach' | 'home_referee' | 'away_referee';
    gameId: number;
    label: string;
}

export default function DroppableUser({ user, role, gameId, label }: DroppableUserProps) {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { setNodeRef, isOver } = useDroppable({
        id: `slot-${gameId}-${role}`,
        data: {
            type: 'slot',
            role,
            gameId,
            user: user,
        },
    });

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        // setInputValue(value);
        setPopoverOpen(value.length > 0);
    }

    return (
        <div className="flex flex-col gap-2">
        <p>{label}:</p>
        <div ref={setNodeRef}
        className={`min-h-[40px] p-2 border-2 border-dashed rounded-lg transition-colors cursor-pointer
            ${isOver ? 'border-blue-500 bg-blue-50' : focus ? 'border-blue-500' : 'hover:border-blue-300 border-gray-300'}
            ${!user ? 'flex items-center justify-center' : ''}`}
            onClick={() => {
                if (!user) {
                    setFocus(true);
                }
            }}>
            {user ? (
                <DraggableUser user={user} role={role} gameId={gameId} />
            ) : (
                focus ? (
                    <div className="flex p-2 gap-2">
                        {/* <input type="text" name="search" id="search" placeholder="Search for a user" className="w-full h-full border-none outline-none" ref={inputRef} onBlur={() => setFocus(false)} onChange={handleInput}  /> */}
                        <input type="text" name="search" id="search" placeholder="Search for a user" className="w-full h-full border-none outline-none" ref={inputRef} onChange={handleInput}  />
                        <UserDropdown open={popoverOpen} onOpenChange={setPopoverOpen} />
                    </div>
                ) : (
                    <div className="flex items-center p-2 gap-2 text-gray-400">
                    <CircleUser />
                    <p>Drop user here</p>
                </div>
                )
            )}
        </div>
    </div>
    )
}