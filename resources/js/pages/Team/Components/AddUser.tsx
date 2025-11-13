import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role, Team } from "@/types";
import { useForm } from "@inertiajs/react";

export function AddUser({ team, roles }: { team: Team, roles: Role[] }) {
    const { data, setData, post, reset, errors } = useForm({
        user_id: "",
        role_id: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('team.add-player', [team]), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} method="post" className="grid grid-cols-2 items-center gap-4">
            <div className="grid gap-y-2">
                <Label htmlFor="user_id" className="mb-1">Gebruiker</Label>

                <Search onSelect={(value) => setData('user_id', value.toString()) } type="user" />
            </div>

            <div className="grid gap-y-2">
                <Label htmlFor="role_id" className="mb-1">Rol</Label>
                <Select
                    value={data.role_id}
                    onValueChange={(value) => setData("role_id", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecteer een rol">
                            {roles?.find((role: any) => role.id === Number(data.role_id))?.name}
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        {roles.map((role: Role) => (
                            <SelectItem key={`role_${role.id}`} value={String(role.id)}>{role.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="col-span-2">
                <Button variant="default" size="sm" className="mt-2 flex justify-self-end">
                    Toevoegen
                </Button>
            </div>
        </form>
    )
}
