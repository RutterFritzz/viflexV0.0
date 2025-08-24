import { User } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Player({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-3 p-2 border rounded-lg">
            <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                <User className="h-4 w-4" />
            </div>
            <span className="font-medium">{name}</span>
            <Badge variant="outline" className="ml-auto text-xs">Player</Badge>
        </div>
    )
}