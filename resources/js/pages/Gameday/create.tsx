import { Calendar22 } from "@/components/calender";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Location } from "@/types";
import { Link } from "@inertiajs/react";
import { Calendar, ArrowLeft, Plus, MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreateProps {
    locations: Location[];
}

export default function Create({ locations }: CreateProps) {
    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('gameday.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar wedstrijddagen')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calendar className="h-8 w-8" />
                        {t('Plan nieuwe wedstrijddag')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('Maak een nieuwe wedstrijddag evenement op een specifieke locatie.')}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {t('Wedstrijddag informatie')}
                    </CardTitle>
                    <CardDescription>
                        {t('Voer de details voor de nieuwe wedstrijddag evenement in.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('gameday.store')} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />

                        <div className="space-y-2">
                            <Label htmlFor="date" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {t('Evenement datum')}
                            </Label>
                            <Calendar22 date={date} setDate={setDate} className="w-full" />
                                <Input type="hidden" name="date" value={date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''} />

                            <p className="text-xs text-muted-foreground">
                                {t('Selecteer de datum voor deze wedstrijddag evenement.')}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location_id" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {t('Locatie')}
                            </Label>
                            <Select name="location_id" required>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('Selecteer een locatie')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location.id} value={location.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-3 w-3" />
                                                <span>{location.name}</span>
                                                <span className="text-muted-foreground">({location.city})</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                {t('Selecteer de locatie waar deze wedstrijddag zal plaatsvinden.')}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                {t('Plan wedstrijddag')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('gameday.index')}>
                                    {t('Annuleren')}
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
                        <Calendar className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">{t('Wedstrijddag management')}</p>
                        <p>{t('Wedstrijddagen zijn evenementen waar meerdere wedstrijden op een specifieke locatie op een specifieke datum kunnen worden gepland. Je kan individuele wedstrijden toevoegen aan een wedstrijddag na het aanmaken ervan.')}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
