import { Team } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, User } from "lucide-react";
import Coach from "@/components/coach";
import { useTranslation } from "react-i18next";
import Player from "@/components/player";

export default function Players({ team }: { team: Team }) {
    const { t } = useTranslation();

    return (
        <div className="grid">
            {/* Coaches */}
            <Card>
                <CardContent>
                    {/* Coaches header */}
                    <div className="mb-2">
                        <div className="flex items-center gap-2 font-semibold">
                            <Crown className="h-5 w-5" />
                            {t('coaches')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {team?.coaches?.length === 0
                                ? t('Geen coaches toegewezen')
                                : `${team?.coaches?.length} ${team?.coaches?.length === 1 ? t('Coach') : t('coaches')} ${t('beheert dit team.')}`
                            }
                        </div>
                    </div>

                    {/* Coaches list */}
                    {!team?.coaches || team?.coaches.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <Crown className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">{t('Geen coaches')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            {team?.coaches.map((coach) => (
                                <Coach key={coach.id} coach={coach} />
                            ))}
                        </div>
                    )}

                    {/* Players header */}
                    <div className="my-2">
                        <div className="flex items-center gap-2 font-semibold">
                            <User className="h-5 w-5" />
                            {t('spelers')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {team?.players?.length === 0
                                ? t('Geen spelers toegewezen')
                                : `${team?.players?.length} ${team?.players?.length === 1 ? t('Speler') : t('spelers')} ${t('op dit team.')}`
                            }
                        </div>
                    </div>

                    {/* Players list */}
                    {!team?.players || team?.players.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <User className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">{t('Geen spelers')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            {team?.players.map((player) => (
                                <Player key={player.id} player={player} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}