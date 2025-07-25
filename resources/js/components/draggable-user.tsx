import { User } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CircleUser } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

interface DraggableUserProps {
user: User;
role: 'home_coach' | 'away_coach' | 'home_referee' | 'away_referee';
gameId: number;
}

export default function DraggableUser({ user, role, gameId }: DraggableUserProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `user-${gameId}-${role}`,
        data: {
            user,
            type: 'user',
            role,
            gameId,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'none' : 'all 0.2s ease',
    };

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} style={style} className={`flex flex-row gap-2 items-center p-2
            border rounded-lg shadow-sm cursor-grab hover:shadow-md transition-shadow ${ isDragging
            ? 'shadow-xl scale-105 cursor-grabbing opacity-50' : '' }`}>
            <CircleUser />
            <p>{user.name}</p>
        </div>
    )
}
