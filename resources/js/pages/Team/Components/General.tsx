import { Team } from "@/types";
import { useTranslation } from "react-i18next";
import UpcommingGames from "@/components/Games/UpcommingGames";
import LastReasults from "@/components/Games/LastReasults";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, Crown, Trophy, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function General({ team }: { team: Team }) {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <span className="flex items-center gap-1">
                                <Crown className="h-4 w-4" />
                                {team.coaches?.length} {team.coaches?.length === 1 ? t('coach') : t('coaches')}
                                {' '}{t('managingThisTeam')}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {team.players?.length} {team.players?.length === 1 ? t('player') : t('players')}
                                {' '}{t('onThisTeam')}
                            </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <UpcommingGames upcomingGames={team?.upcoming_games} />

            <LastReasults lastResults={team?.last_results} />

            {team.competitions && team.competitions.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5" />
                                    {t('competitions')}
                                </CardTitle>
                                <CardDescription>
                                    {t('competitionsThisTeamIsParticipatingIn')}
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">{team.competitions.length}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {team.competitions.map((competition) => (
                                <div
                                    key={competition.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Trophy className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">{competition.name}</div>
                                            <div className="text-muted-foreground text-xs">
                                                {competition.category} • {competition.year}
                                            </div>
                                        </div>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={route('competition.show', competition.id)}>
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}