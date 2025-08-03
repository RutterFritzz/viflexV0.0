import { User } from "@/types";
import { CircleUser } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import DraggableUser from "@/components/draggable-user";
import { useState } from "react";
import UserSearch from "./user-search";

interface DroppableUserProps {
    user: User | null;
    role: 'home_coach' | 'away_coach' | 'home_referee' | 'away_referee';
    gameId: number;
    label: string;
    onUserAssign?: (user: User, role: string, gameId: number) => void;
}

export default function DroppableUser({ user, role, gameId, label, onUserAssign }: DroppableUserProps) {
    const [focus, setFocus] = useState(false);
    const { setNodeRef, isOver } = useDroppable({
        id: `slot-${gameId}-${role}`,
        data: {
            type: 'slot',
            role,
            gameId,
            user: user,
        },
    });

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
                            <UserSearch setFocus={setFocus} focus={focus} onUserAssign={onUserAssign} role={role} gameId={gameId} />
                    </div>
                ) : (
                    <div className="flex items-center p-2 gap-2 text-gray-400">
                    <CircleUser />
                    <p>Search or drop user here</p>
                </div>
                )
            )}
        </div>
    </div>
    )
}