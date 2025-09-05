import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import { Link } from "@inertiajs/react";
import { MapPin, ArrowLeft, Save, Building2, Map } from "lucide-react";
import { t } from "i18next";

interface EditProps {
    location: Location;
}

export default function Edit({ location }: EditProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('location.show', location.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToLocation')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="h-8 w-8" />
                        {t('editLocation')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('updateTheDetailsFor')} <span className="font-medium">{location.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('locationInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('makeChangesToTheLocationDetailsBelow')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('location.update', location.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />
                        
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
                                defaultValue={location.name}
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
                                defaultValue={location.city}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {t('updateLocation')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('location.show', location.id)}>
                                    {t('cancel')}
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Current Values Display */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Building2 className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">{t('currentValues')}</p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="font-medium text-xs">{t('venueName')}</p>
                                <p className="text-xs">{location.name}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xs">{t('city')}</p>
                                <Badge variant="outline" className="text-xs">{location.city}</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
