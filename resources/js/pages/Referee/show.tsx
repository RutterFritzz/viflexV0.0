import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Referee } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import {
    Gavel,
    ArrowLeft,
    Edit,
    Trash2,
    User,
    Award,
    Mail,
    Calendar,
    Clock,
    Trophy
} from "lucide-react";
import { t } from "i18next";

interface ShowProps {
    referee: Referee;
}

export default function Show({ referee }: ShowProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

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

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('referee.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToReferees')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8" />
                        {referee.user?.name || t('unknownReferee')}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <Badge variant={getCategoryBadge(referee.category) as "default" | "secondary" | "outline"}>
                                {referee.category} {t('referee')}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{referee.user?.email || t('noEmail')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Referee Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {t('personalInformation')}
                        </CardTitle>
                        <CardDescription>
                            {t('basicDetailsAboutThisReferee')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('name')}:</span>
                                <span className="font-medium">{referee.user?.name || 'Unknown'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('email')}:</span>
                                <span className="font-medium">{referee.user?.email || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('category')}:</span>
                                <Badge variant={getCategoryBadge(referee.category) as "default" | "secondary" | "outline"}>
                                    {referee.category}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('refereeId')}:</span>
                                <span className="font-medium">#{referee.id}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            {t('refereeStatistics')}
                        </CardTitle>
                        <CardDescription>
                            {t('overviewOfRefereeActivityAndPerformance')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-primary">{referee.category}</div>
                                <div className="text-sm text-muted-foreground">{t('specialization')}</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-secondary">{t('active')}</div>
                                <div className="text-sm text-muted-foreground">{t('status')}</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-accent">{t('available')}</div>
                                <div className="text-sm text-muted-foreground">{t('availability')}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Qualifications & Experience Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        {t('qualificationsAndExperience')}
                    </CardTitle>
                    <CardDescription>
                        {t('refereeCertificationsAndExperienceDetails')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{t('categoryCertification')}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {t('certifiedToOfficiate')} {referee.category} {t('levelCompetitionsAndGames')}
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{t('experienceLevel')}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {t('qualifiedRefereeWithAppropriateTrainingAndCertification')}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-medium">{t('registrationDate')}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t('thisRefereeHasBeenRegisteredInTheSystemAndIsAvailableForAssignments')}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('refereeActions')}</CardTitle>
                    <CardDescription>
                        {t('manageRefereeSettingsAndNavigation')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('referee.edit', referee.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('editReferee')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('referee.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('backToReferees')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('deleteReferee')}
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="referee"
                            name={referee.user?.name || t('unknownReferee')}
                            onOpenChange={setDialogOpen}
                            id={referee.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}