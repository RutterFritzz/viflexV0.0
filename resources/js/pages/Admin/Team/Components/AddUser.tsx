import Header from "@/components/Admin/Header";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role, Team } from "@/types";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
export function AddUser({ team, roles }: { team: Team, roles: Role[] }) {
    const { t } = useTranslation();
    const { data, setData, post, reset } = useForm({
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
        <div className="space-y-4">

            <h3 className="font-bold text-base">{t('Speler toevoegen')}</h3>

            <form onSubmit={handleSubmit} method="post" className="grid grid-cols-2 items-center gap-4">
                <div className="grid gap-y-2">
                    <Label htmlFor="user_id" className="mb-1">{t('Gebruiker')}</Label>

                    <Search onSelect={(value) => setData('user_id', value.toString()) } type="user" />
                </div>

                <div className="grid gap-y-2">
                    <Label htmlFor="role_id" className="mb-1">{t('Rol')}</Label>
                    <Select
                        value={data.role_id}
                        onValueChange={(value) => setData("role_id", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('Selecteer rol')}>
                                {roles?.find((role: Role) => role.id === Number(data.role_id))?.name}
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
                        {t('Toevoegen')}
                    </Button>
                </div>
            </form>
        </div>
    )
}
