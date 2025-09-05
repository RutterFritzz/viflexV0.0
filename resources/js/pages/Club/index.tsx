import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Club } from "@/types";
import { Link } from "@inertiajs/react";
import { Building2, MapPin, Plus, Eye } from "lucide-react";
import { t } from "i18next";

export default function Index({ clubs }: { clubs: Club[] }) {
    return (
        <div className="max-w-6xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Building2 className="h-8 w-8" />
                            {t('clubs')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('manageAndViewAllSportsClubsInYourOrganization')}
                        </p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {clubs.length} {clubs.length === 1 ? t('club') : t('clubs')}
                    </Badge>
                </div>
            </div>

            {/* Clubs Grid */}
            {clubs.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('noClubsYet')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('createYourFirstClubToGetStartedWithManagingTeamsAndPlayers')}
                        </p>
                        <Button asChild>
                            <Link href={route('club.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('createYourFirstClub')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {clubs.map((club) => (
                            <Card key={club.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Building2 className="h-5 w-5" />
                                        {club.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {club.location}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="pt-0">
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={route('club.show', club.id)}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            {t('viewClub')}
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Create New Club Button */}
                    <Card className="border-dashed">
                        <CardContent className="text-center py-8">
                            <Button asChild size="lg">
                                <Link href={route('club.create')}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    {t('createNewClub')}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}