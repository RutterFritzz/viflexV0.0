import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Referee } from "@/types";
import { Link } from "@inertiajs/react";
import { Gavel, Plus, ArrowLeft, User, Award, Users } from "lucide-react";
import { t } from "i18next";

export default function Index({ referees }: { referees: Referee[] }) {
    // Helper function to get category badge color
    const getCategoryBadge = (category: string) => {
        const categoryColors: Record<string, string> = {
            'Men': 'default',
            'Women': 'secondary',
            'U10': 'outline',
            'U12': 'outline',
            'U14': 'outline',
            'U18': 'outline'
        };
        return categoryColors[category] || 'outline';
    };

    // Group referees by category
    const refereesByCategory = referees.reduce((acc, referee) => {
        const category = referee.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(referee);
        return acc;
    }, {} as Record<string, Referee[]>);

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
                            <Gavel className="h-8 w-8" />
                            {t('referees')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('manageAndOrganizeSportsRefereesForCompetitionsAndGames')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {referees.length} {referees.length === 1 ? t('referee') : t('referees')}
                        </Badge>
                        <Button asChild>
                            <Link href={route('referee.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('addReferee')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Referees by Category */}
            {referees.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Gavel className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('noRefereesRegistered')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('addYourFirstRefereeToStartManagingOfficiatingForYourCompetitions')}
                        </p>
                        <Button asChild>
                            <Link href={route('referee.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('addFirstReferee')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    {Object.entries(refereesByCategory).map(([category, categoryReferees]) => (
                        <div key={category} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    {category} {t('referees')}
                                </h2>
                                <Badge variant="outline" className="text-sm">
                                    {categoryReferees.length} {categoryReferees.length === 1 ? t('referee') : t('referees')}
                                </Badge>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {categoryReferees.map((referee) => (
                                    <Card key={referee.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <User className="h-5 w-5 text-primary" />
                                                    {referee.user?.name || t('unknownReferee')}
                                                </CardTitle>
                                                <Badge variant={getCategoryBadge(referee.category) as "default" | "secondary" | "outline"}>
                                                    {referee.category}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex items-center gap-2">
                                                <User className="h-3 w-3" />
                                                <span className="text-xs">{referee.user?.email || t('noEmail')}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">{t('category')}:</span>
                                                    <Badge variant="outline" className="text-xs">{referee.category}</Badge>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">{t('email')}:</span>
                                                    <span className="font-medium text-xs truncate max-w-[150px]">
                                                        {referee.user?.email || t('nA')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between pt-2">
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={route('referee.show', referee.id)}>
                                                            {t('viewDetails')}
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Statistics Card */}
            {referees.length > 0 && (
                <Card className="border-dashed border-muted-foreground/25">
                    <CardHeader>
                        <CardTitle className="text-sm">{t('refereeStatistics')}</CardTitle>
                        <CardDescription>
                            {t('overviewOfRefereeDistributionAcrossCategories')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(refereesByCategory).map(([category, categoryReferees]) => (
                                <div key={category} className="text-center p-3 border rounded-lg">
                                    <div className="text-lg font-bold text-primary">{categoryReferees.length}</div>
                                    <div className="text-xs text-muted-foreground">{category}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
