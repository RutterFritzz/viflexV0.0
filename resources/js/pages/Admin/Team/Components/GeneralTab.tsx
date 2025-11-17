import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, Club, Team, TeamValue } from "@/types";
import { Link, router, useForm } from "@inertiajs/react";
import { Users, Save, Crown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddValue } from "./AddValue";

export default function GeneralTab({team, clubs}: {team: Team, clubs: Club[]}) {
    const { t } = useTranslation();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(team.logo_cache);
    const categories = ["Men", "Women", "o10", "o12", "o14", "o18"]

    const { data, setData, post, processing, errors, reset } = useForm({
        name: team.name,
        club_id: team.club_id,
        category: team.category,
        travel_time: team.travel_time,
        logo: (team.logo_cache as unknown) as File
    });

    console.log(data)

    const [teamValues, setTeamValues] = useState<any[]>([])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData("logo", file);
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const handleTeamValueDelete = (teamValue: TeamValue) => {
        router.delete(route('admin.teams.teamValue.destroy', [team, teamValue]), {
            preserveScroll: true,
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.teams.update', [team]));
    };

    useEffect(() => {
        setTeamValues(team.values ?? [])
    }, [team])

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('Team informatie')}
                    </CardTitle>
                    <CardDescription>
                        {t('Maak wijzigingen aan de team details hieronder.')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} method="post" className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {t('Team naam')}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder={t('Voer team naam in')}
                                defaultValue={team.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {t('Reistijd')}
                            </Label>
                            <Input
                                id="travel_time"
                                type="text"
                                name="travel_time"
                                defaultValue={team.travel_time}
                                onChange={(e) => setData("travel_time", e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                Club
                            </Label>
                            <Select
                                value={data.club_id}
                                onValueChange={(value: any) => setData("club_id", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecteer een club">
                                        {clubs.find((club:Club)=>club.id == Number(data.club_id))?.name}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    {clubs.map((club) => (
                                        <SelectItem key={`club_${club.id}`} value={String(club.id)}>{club.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                Categorie
                            </Label>
                            <Select
                                value={data.category}
                                onValueChange={(value: Category) => setData("category", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecteer een category">
                                        {categories?.find((category: any) => category.id === data.category)}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={`category_${category}`} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-x-4 space-y-4">
                            <Label htmlFor="logo" className="mb-2">Logo</Label>

                            <Input id="logo" type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

                            <Button type="button" variant="outline" onClick={handleSelectImage} className="w-fit">
                                Logo selecteren
                            </Button>

                            {(logoPreview || data.logo) && (
                                <div className="relative h-auto w-auto max-w-24 border rounded-md overflow-hidden mb-2">
                                    <img src={logoPreview ?? String(data.logo)} alt="Preview" className="object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="submit" className="w-fit">
                                <Save className="h-4 w-4 mr-2" />
                                {t('Update team')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('team.show', team.id)}>
                                    {t('Annuleren')}
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5" />
                        {t('values')}
                    </CardTitle>
                    <CardDescription>
                        <AddValue team={team} />
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-4">
                        {teamValues?.map((tv) => (
                            <div key={tv.id} className="group flex items-center w-fit">
                                <p>{tv.value}</p>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 hover:bg-transparent transition-opacity"
                                    onClick={() => { handleTeamValueDelete(tv) }}
                                >
                                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
