import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";
import { Building2, MapPin, ArrowLeft, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Create() {
    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToClubs')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Building2 className="h-8 w-8" />
                        {t('createNewClub')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('addANewSportsClubToYourOrganization')}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {t('clubInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('enterTheBasicInformationForTheNewClub')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('club.store')} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                {t('clubName')}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder={t('enterClubName')}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {t('location')}
                            </Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                placeholder={t('enterLocation')}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                {t('createClub')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('club.index')}>
                                    {t('cancel')}
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}