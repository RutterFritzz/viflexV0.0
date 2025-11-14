import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";
import { MapPin, ArrowLeft, Plus, Building2, Map } from "lucide-react";
import { useTranslation } from "react-i18next";
import MainLayout from '@/layouts/MainLayout';


export default function Create() {
    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto space-y-6 p-6">
                {/* Header Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('location.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar locaties')}
                            </Link>
                        </Button>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <MapPin className="h-8 w-8" />
                            {t('Voeg nieuwe locatie toe')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('Creëer een nieuwe sport venue of locatie voor wedstrijden en evenementen.')}
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            {t('Locatie informatie')}
                        </CardTitle>
                        <CardDescription>
                            {t('Voer de details voor de nieuwe locatie in.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={route('location.store')} method="post" className="space-y-6">
                            <input type="hidden" name="_token" value={csrf_token} />

                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    {t('Locatie naam')}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder={t('Voer locatie naam in')}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city" className="flex items-center gap-2">
                                    <Map className="h-4 w-4" />
                                    {t('Plaats')}
                                </Label>
                                <Input
                                    id="city"
                                    type="text"
                                    name="city"
                                    placeholder={t('Voer stad naam in')}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {t('Adres')}
                                </Label>
                                <Input
                                    id="address"
                                    type="text"
                                    name="address"
                                    placeholder={t('Voer adres in')}
                                    className="w-full"
                                />
                            </div>


                            <div className="flex gap-3 pt-4">
                                <Button type="submit" className="flex-1">
                                    <Plus className="h-4 w-4 mr-2" />
                                    {t('Creëer locatie')}
                                </Button>
                                <Button asChild variant="outline" type="button">
                                    <Link href={route('location.index')}>
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
                            <Building2 className="h-8 w-8 mx-auto opacity-50" />
                            <p className="font-medium">{t('Locatie management')}</p>
                            <p>{t('Locaties worden gebruikt om aan te geven waar wedstrijden en evenementen plaatsvinden. Je kan meerdere locaties in verschillende steden aanmaken.')}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
