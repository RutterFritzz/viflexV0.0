import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Team } from "@/types";
import { Link } from "@inertiajs/react";
import { Users, ArrowLeft, Save } from "lucide-react";
import { t } from "i18next";

export default function Edit({ team }: { team: Team }) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('team.show', team.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToTeam')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        {t('editTeam')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('updateTheInformationFor')} <span className="font-medium">{team.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('teamInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('makeChangesToTheTeamDetailsBelow')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('team.update', team.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {t('teamName')}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder={t('enterTeamName')}
                                defaultValue={team.name}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {t('updateTeam')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('team.show', team.id)}>
                                    {t('cancel')}
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}