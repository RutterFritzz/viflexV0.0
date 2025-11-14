import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Referee } from "@/types";
import { Link } from "@inertiajs/react";
import { Gavel, Plus, ArrowLeft, User, Award, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import MainLayout from '@/layouts/MainLayout';


export default function Index({ referees }: { referees: Referee[] }) {
    const { t } = useTranslation();
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
        <MainLayout>
            <div className="max-w-7xl mx-auto space-y-6 p-6">
                {/* Header Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar dashboard')}
                            </Link>
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                                <Gavel className="h-8 w-8" />
                                {t('scheidsrechters')}
                            </h1>
                            <p className="text-muted-foreground">
                                {t('Beheer en organiseer sportscheidsrechters voor competities en wedstrijden.')}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {referees.length} {referees.length === 1 ? t('scheidsrechter') : t('scheidsrechters')}
                            </Badge>
                            <Button asChild>
                                <Link href={route('referee.create')}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    {t('Voeg scheidsrechter toe')}
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
                            <h3 className="text-lg font-medium mb-2">{t('Geen scheidsrechters geregistreerd')}</h3>
                            <p className="text-muted-foreground mb-6">
                                {t('Voeg je eerste scheidsrechter toe om te beginnen met het beheren van het scheidsrechtsbieden voor je competities.')}
                            </p>
                            <Button asChild>
                                <Link href={route('referee.create')}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    {t('Voeg eerste scheidsrechter toe')}
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
                                        {category} {t('scheidsrechters')}
                                    </h2>
                                    <Badge variant="outline" className="text-sm">
                                        {categoryReferees.length} {categoryReferees.length === 1 ? t('scheidsrechter') : t('scheidsrechters')}
                                    </Badge>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {categoryReferees.map((referee) => (
                                        <Card key={referee.id} className="hover:shadow-md transition-shadow">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg flex items-center gap-2">
                                                        <User className="h-5 w-5 text-primary" />
                                                        {referee.user?.name || t('Onbekende scheidsrechter')}
                                                    </CardTitle>
                                                    <Badge variant={getCategoryBadge(referee.category) as "default" | "secondary" | "outline"}>
                                                        {referee.category}
                                                    </Badge>
                                                </div>
                                                <CardDescription className="flex items-center gap-2">
                                                    <User className="h-3 w-3" />
                                                    <span className="text-xs">{referee.user?.email || t('Geen email')}</span>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">{t('Categorie')}:</span>
                                                        <Badge variant="outline" className="text-xs">{referee.category}</Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">{t('Email')}:</span>
                                                        <span className="font-medium text-xs truncate max-w-[150px]">
                                                            {referee.user?.email || t('N/A')}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-2">
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={route('referee.show', referee.id)}>
                                                                {t('Bekijk details')}
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
                            <CardTitle className="text-sm">{t('Scheidsrechter statistieken')}</CardTitle>
                            <CardDescription>
                                {t('Overzicht van scheidsrechter distributie over categorieën.')}
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
        </MainLayout>
    );
}
