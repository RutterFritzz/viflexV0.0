import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Competition } from "@/types";
import { Link } from "@inertiajs/react";
import { Trophy, Calendar, Tag, Plus, Eye, ArrowLeft } from "lucide-react";
import { t } from "i18next";

export default function Index({ competitions }: { competitions: Competition[] }) {
    // Group competitions by year for better organization
    const competitionsByYear = competitions.reduce((acc, competition) => {
        const year = competition.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(competition);
        return acc;
    }, {} as Record<number, Competition[]>);

    const years = Object.keys(competitionsByYear).map(Number).sort((a, b) => b - a);

    return (
        <div className="max-w-6xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToDashboard')}
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Trophy className="h-8 w-8" />
                            {t('competitions')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('manageAndViewAllCompetitionsAcrossDifferentCategoriesAndYears')}
                        </p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {competitions.length} {competitions.length === 1 ? t('competition') : t('competitions')}
                    </Badge>
                </div>
            </div>

            {/* Create Competition Button */}
            <div className="flex justify-end">
                <Button asChild>
                    <Link href={route('competition.create')}>
                        <Plus className="h-4 w-4 mr-2" />
                        {t('createNewCompetition')}
                    </Link>
                </Button>
            </div>

            {/* Competitions by Year */}
            {competitions.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('noCompetitionsYet')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('createYourFirstCompetitionToStartOrganizingTournamentsAndLeagues')}
                        </p>
                        <Button asChild>
                            <Link href={route('competition.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('createYourFirstCompetition')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    {years.map((year) => (
                        <div key={year} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    <Calendar className="h-6 w-6" />
                                    {year}
                                </h2>
                                <Badge variant="outline" className="text-xs">
                                    {competitionsByYear[year].length} {competitionsByYear[year].length === 1 ? 'competition' : 'competitions'}
                                </Badge>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {competitionsByYear[year].map((competition) => (
                                    <Card key={competition.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Trophy className="h-5 w-5" />
                                                {competition.name}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <Tag className="h-3 w-3" />
                                                <Badge variant="secondary" className="text-xs">
                                                    {competition.category}
                                                </Badge>
                                                <Calendar className="h-3 w-3 ml-2" />
                                                <span className="text-xs">{competition.year}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="pt-0">
                                            <Button asChild variant="outline" className="w-full">
                                                <Link href={route('competition.show', competition.id)}>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    {t('viewCompetition')}
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
