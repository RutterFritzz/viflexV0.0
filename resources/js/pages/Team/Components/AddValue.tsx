import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Game, Team } from "@/types";
import { useForm } from "@inertiajs/react";

export function AddValue({ team }: { team: Team }) {
    const { data, setData, post, reset, errors } = useForm({
        value: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("team.teamValue.add", [team]));
    };

    return (
        <form onSubmit={handleSubmit} method="post">
            <div className="space-y-2 mt-4">
                <Label htmlFor="value" className="flex items-center gap-2">
                    Veld
                </Label>
                <Input
                    id="value"
                    type="text"
                    name="value"
                    className="w-full"
                    onChange={e => setData('value', e.target.value)}
                />
            </div>

            <Button
                variant="default"
                size="sm"
                className="mt-2 flex justify-self-end"
            >
                Toevoegen
            </Button>
        </form>
    )
}
