import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateScore from "./UpdateScore";
import { Game } from "@/types";
import { ArrowLeft, Edit, Target, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import DeleteConfirmation from "@/components/delete-confirmation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Settings({ game }: { game: Game }) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* Score Update Section */}
            < Card >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {t('Update score')}
                    </CardTitle>
                    <CardDescription>
                        {t('Registreer de eindscore voor deze wedstrijd.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateScore game={game} />
                </CardContent>
            </Card >

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('Wedstrijd acties')}</CardTitle>
                    <CardDescription>
                        {t('Beheer wedstrijdinformatie en navigatie.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('game.edit', game.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('Bewerk wedstrijd')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('game.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar wedstrijden')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('Verwijder wedstrijd')}
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="game"
                            name={`${game?.home_team?.name} vs ${game?.away_team?.name}`}
                            onOpenChange={setDialogOpen}
                            id={game.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}