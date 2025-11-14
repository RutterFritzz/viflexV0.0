import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { Users, Save, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Game, Location, Team } from "@/types";
import { useState } from "react";
import InputError from "@/components/input-error";

export default function UpdateGame({ game, teams, locations }: { game: Game, teams: Team[], locations: Location[] }) {
    const { t } = useTranslation();
    const [date, setDate] = useState<Date | undefined>(game.gameday?.date ? new Date(game.gameday?.date) : undefined);

    const { data, setData, put, processing, errors, reset } = useForm({
        home_team_id: game.home_team_id,
        away_team_id: game.away_team_id,
        // location_id: game.location?.id,
        // date: date,
        time: game.time,
        arrival_time: game.arrival_time
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('game.update', [game]));
    };

    return (
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="home_team_id" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {t('Thuis team')}
                    </Label>
                    <Select value={String(data.home_team_id)}
                        onValueChange={(value) => setData("home_team_id", Number(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecteer een team">
                                {teams?.find((team: Team) => team.id === Number(data.home_team_id))?.name ?? "Selecteer een team"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">Selecteer een team</SelectItem>
                            {teams?.filter((team: Team) => team.id !== Number(data.home_team_id)).map((team: Team) => (
                                <SelectItem key={`home-team-${team.id}`} value={String(team.id)}>{team.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError message={errors.home_team_id} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="away_team_id" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {t('away_team')}
                    </Label>
                    <Select value={String(data.away_team_id)} onValueChange={(value) => setData("away_team_id", Number(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecteer een team">
                                {teams?.find((team: Team) => team.id === Number(data.away_team_id))?.name ?? "Selecteer een team"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">Selecteer een team</SelectItem>
                            {teams?.filter((team: Team) => team.id !== Number(data.away_team_id)).map((team: Team) => (
                                <SelectItem key={`home-team-${team.id}`} value={String(team.id)}>{team.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError message={errors.away_team_id} className="mt-2" />
                </div>
            </div>

            {/* <div className="space-y-2">
                <Label htmlFor="location_id" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t('Locatie')}
                </Label>
                <Select name="location_id" required defaultValue={data?.location_id?.toString()}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('Selecteer locatie')} />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                                {location.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <InputError message={errors.location_id} className="mt-2" />
            </div> */}

            <div className="grid gap-6 md:grid-cols-2">
                {/* <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t('Datum')}
                    </Label>
                    <Calendar22 date={date} setDate={setDate} />
                    <Input
                        type="hidden"
                        name="date"
                        value={date
                            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                            : ''}
                        />

                        <InputError message={errors.date} className="mt-2" />
                </div> */}

                <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t('Tijd')}
                    </Label>
                    <Input
                        id="time" type="time" name="time"
                        defaultValue={data.time}
                        onChange={(e) => setData('time', e.target.value)}
                        required
                        className="w-full"
                    />

                    <InputError message={errors.time} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t('Aanvangstijd')}
                    </Label>
                    <Input
                        id="arrival_time" type="text" name="arrival_time"
                        defaultValue={data.arrival_time}
                        onChange={(e) => setData('arrival_time', e.target.value)}
                        required
                        className="w-full"
                    />

                    <InputError message={errors.arrival_time} className="mt-2" />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {t('Update wedstrijd')}
                </Button>
                <Button asChild variant="outline" type="button">
                    <Link href={route('game.show', game.id)}>
                        {t('Annuleren')}
                    </Link>
                </Button>
            </div>
        </form>
    )
}
