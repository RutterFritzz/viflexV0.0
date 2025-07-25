import { User } from "@/types";
import { CircleUser } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import DraggableUser from "@/components/draggable-user";

interface DroppableUserProps {
    user: User | null;
    role: 'home_coach' | 'away_coach' | 'home_referee' | 'away_referee';
    gameId: number;
    label: string;
}

export default function DroppableUser({ user, role, gameId, label }: DroppableUserProps) {
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
        className={`min-h-[40px] p-2 border-2 border-dashed rounded-lg transition-colors
            ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${!user ? 'flex items-center justify-center' : ''}`}>
            {user ? (
                <DraggableUser user={user} role={role} gameId={gameId} />
            ) : (
                <div className="flex items-center p-2 gap-2 text-gray-400">
                    <CircleUser />
                    <span>Drop user here</span>
                </div>
            )}
        </div>
    </div>
    )
}