import { Calendar22 } from "@/components/calender";
import Player from "@/components/player";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputGroup, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { Trophy, ArrowLeft, Save, Calendar, Clock, MapPin, Users, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Game } from "@/types";

export default function TeamTravelCard({game, competitionTeam }: {game: Game,competitionTeam: any}) {
    const { t } = useTranslation();

    console.log(competitionTeam)

    const { data, setData, put, processing, errors } = useForm({
        travel_time: competitionTeam.travel_time,
        arrival_time: competitionTeam.arrival_time
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('game.updateTeamTime', [game, competitionTeam]));
    };

    return (
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {t('homeTeam')}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="home_team_score" className="flex items-center gap-2">
                            Rijstijd
                        </Label>

                        <InputGroup>
                            <InputGroupInput
                                id="travel_time"
                                type="number"
                                name="travel_time"
                                value={data.travel_time}
                                onChange={(e) => setData("travel_time", e.target.value)}
                            />
                            <InputGroupText className="pr-2">
                                minuten
                            </InputGroupText>
                        </InputGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="home_team_score" className="flex items-center gap-2">
                            Aanvang
                        </Label>

                        <InputGroup>
                            <InputGroupInput
                                id="arrival_time"
                                type="number"
                                name="arrival_time"
                                value={data.arrival_time}
                                onChange={(e) => setData("arrival_time", e.target.value)}
                            />
                            <InputGroupText className="pr-2">
                                minuten
                            </InputGroupText>
                        </InputGroup>
                    </div>

                    <Button type="submit" className="w-fit justify-self-end">
                        Update tijden
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
