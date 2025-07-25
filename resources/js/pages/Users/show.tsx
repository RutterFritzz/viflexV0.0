import { User } from "@/types";

export default function Show({ user }: { user: User }) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
        </div>
    )
}