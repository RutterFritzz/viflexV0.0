import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

import { useTranslation } from "react-i18next";
import { Award, Plus } from "lucide-react";
import { Game, GameTeamValue, Team } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export function ContextCard({ game, team }: { game: Game, team?: Team }) {
    const { t } = useTranslation();

    const { data, setData, post, reset, errors } = useForm<{ fields: Record<any, any[]> }>({
        fields: {},
    });


    const addValueToData = (key: any, value: any) => {
        const fields = data.fields;
        key = snakeCase(key);
        fields[key] = value;
        setData((prev) => ({ ...prev, fields }));

        // console.log(data)
    };

    // console.log(team?.values)

    function snakeCase(string: string): string {
        return string.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map((word) => word.toLowerCase()).join("_");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("competition.game.teamvalues.update", [game.competition, game, team]));
    };

    // console.log(game, team);

    useEffect(() => {
        team?.game_values?.map((gv: GameTeamValue) => {
            addValueToData(gv.team_value.value, gv.value)
        })
    }, [team?.game_values])

    console.log(data);
    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {team?.values?.map((tv) => (
                        <div className="mb-4">
                            <Label htmlFor={tv.value} className="mb-1">{tv.value}</Label>
                            <Input
                                id={tv.value}
                                name={tv.value}
                                value={data.fields[snakeCase(tv.value)] ?? ''}
                                onChange={(e) => addValueToData(tv.value, e.target.value)}
                            />
                        </div>
                    ))}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="submit" className="w-fit">
                            <Plus className="h-4 w-4 mr-2" />
                            {t('Opslaan')}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
