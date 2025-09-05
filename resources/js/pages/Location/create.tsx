import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";
import { MapPin, ArrowLeft, Plus, Building2, Map } from "lucide-react";
import { t } from "i18next";

export default function Create() {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('location.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToLocations')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="h-8 w-8" />
                        {t('addNewLocation')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('createANewSportsVenueOrLocationForGamesAndEvents')}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {t('locationInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('enterTheDetailsForTheNewLocation')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('location.store')} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                {t('venueName')}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder={t('enterVenueName')}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city" className="flex items-center gap-2">
                                <Map className="h-4 w-4" />
                                {t('city')}
                            </Label>
                            <Input
                                id="city"
                                type="text"
                                name="city"
                                placeholder={t('enterCityName')}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                {t('createLocation')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('location.index')}>
                                    {t('cancel')}
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Building2 className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">{t('locationManagement')}</p>
                        <p>{t('locationsAreUsedToSpecifyWhereGamesAndEventsTakePlaceYouCanCreateMultipleVenuesInDifferentCities')}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
