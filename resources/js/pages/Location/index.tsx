import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import { Link } from "@inertiajs/react";
import { MapPin, Plus, ArrowLeft, Building2, Map } from "lucide-react";
import { t } from "i18next";

export default function Index({ locations }: { locations: Location[] }) {
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
                            <MapPin className="h-8 w-8" />
                            {t('locationsAndVenues')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('manageAllSportsVenuesAndLocationsForGamesAndEvents')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {locations.length} {locations.length === 1 ? t('location') : t('locations')}
                        </Badge>
                        <Button asChild>
                            <Link href={route('location.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('addLocation')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Locations Grid */}
            {locations.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('noLocationsYet')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('createYourFirstLocationToStartOrganizingGamesAndEvents')}
                        </p>
                        <Button asChild>
                            <Link href={route('location.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('createFirstLocation')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {locations.map((location) => (
                        <Card key={location.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-primary" />
                                        {location.name}
                                    </CardTitle>
                                    <Badge variant="outline" className="text-xs">
                                        {location.city}
                                    </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                    <Map className="h-3 w-3" />
                                    <span className="text-xs">{location.city}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-medium">{t('venue')}:</span> {location.name}
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={route('location.show', location.id)}>
                                            {t('viewDetails')}
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
