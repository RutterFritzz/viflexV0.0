import { Game, User } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import DroppableUser from "@/components/droppable-user";

interface EditGameCardProps {
    game: Game;
    onUserAssign?: (user: User, role: string, gameId: number) => void;
}

export default function EditGameCard({ game, onUserAssign }: EditGameCardProps) {
    const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({ id: game.id, data: { type: 'game' } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} style={style} className={`border rounded-lg p-4 shadow-sm
    hover:shadow-md transition-shadow touch-none ${isDragging ? 'shadow-xl scale-105 cursor-grabbing' : ''}`}>
            <h2 className="text-lg font-semibold mb-2">
                {game.home_team.name} vs {game.away_team.name}
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <DroppableUser user={game.home_coach} role="home_coach" gameId={game.id} label="Coach" onUserAssign={onUserAssign} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <DroppableUser user={game.away_coach} role="away_coach" gameId={game.id} label="Coach" onUserAssign={onUserAssign} />
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <DroppableUser user={game.home_referee} role="home_referee" gameId={game.id} label="Referee" onUserAssign={onUserAssign} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <DroppableUser user={game.away_referee} role="away_referee" gameId={game.id} label="Referee" onUserAssign={onUserAssign} />
                    </div>
                </div>
            </div>
        </div>
    );
}
