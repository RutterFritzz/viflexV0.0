import { Trash2 } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

interface TrashCanProps {
    isVisible: boolean;
}

export default function TrashCan({ isVisible }: TrashCanProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: 'trash-can',
        data: {
            type: 'trash',
        },
    });

    if (!isVisible) return null;

    return (
        <div
            ref={setNodeRef}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-200 ${
                isOver
                    ? 'bg-red-500 text-white scale-110'
                    : 'bg-white text-gray-600 hover:bg-red-50'
            }`}
        >
            <Trash2 size={24} />
        </div>
    );
}