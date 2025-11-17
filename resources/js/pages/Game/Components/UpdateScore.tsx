import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { Users, ArrowLeft, Plus, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Game } from "@/types";

interface CreateProps {
    game: Game;
}

export default function UpdateScore({ game }: CreateProps) {
    const { t } = useTranslation();

    const { data, setData, put, processing, errors, reset } = useForm({
        home_team_score: game.home_team_score,
        away_team_score: game.away_team_score
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('game.updateScore', game.id), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="home_team_score" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {game.home_team?.name} {t('score')}
                    </Label>
                    <Input
                        id="home_team_score"
                        type="number"
                        name="home_team_score"
                        placeholder="0"
                        defaultValue={data.home_team_score || 0}
                        onChange={(e) => setData("home_team_score", Number(e.target.value))}
                        min="0"
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="away_team_score" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {game.away_team?.name || t('Team B')} {t('score')}
                    </Label>
                    <Input
                        id="away_team_score"
                        type="number"
                        name="away_team_score"
                        placeholder="0"
                        defaultValue={data.away_team_score || 0}
                        onChange={(e) => setData("away_team_score", Number(e.target.value))}
                        min="0"
                        className="w-full"
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                    <Target className="h-4 w-4 mr-2" />
                    {t('Update score')}
                </Button>
            </div>
        </form>
    );
}
