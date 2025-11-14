import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Category, Referee } from "@/types";
import { Link } from "@inertiajs/react";
import { Gavel, ArrowLeft, Save, User as UserIcon, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EditProps {
    referee: Referee;
    categories: Category[];
}

export default function Edit({ referee, categories }: EditProps) {
    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('referee.show', referee.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar scheidsrechters')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8" />
                        {t('Bewerk scheidsrechter')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('Update de details voor scheidsrechter')} <span className="font-medium">{referee.user?.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('Scheidsrechter informatie')}
                    </CardTitle>
                    <CardDescription>
                        {t('Maak wijzigingen aan de scheidsrechter details hieronder.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('referee.update', referee.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="space-y-2">
                            <Label htmlFor="user_id" className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                {t('Scheidsrechter gebruiker')}
                            </Label>
                            <div className="p-3 border rounded-md bg-muted/50">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{referee.user?.name}</span>
                                    <span className="text-muted-foreground">({referee.user?.email})</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {t('De gebruiker die bij deze scheidsrechter hoort, kan niet worden gewijzigd.')}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                {t('Scheidsrechter categorie')}
                            </Label>
                            <Select name="category" defaultValue={referee.category} required>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('Selecteer scheidsrechter categorie')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            <div className="flex items-center gap-2">
                                                <Award className="h-3 w-3" />
                                                <span>{category}</span>
                                        </div>
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                {t('Update de categorie waar deze scheidsrechter gekwalificeerd is om te scheidsrechtsbieden.')}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {t('Update scheidsrechter')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('referee.show', referee.id)}>
                                    {t('Annuleren')}
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
                        <Gavel className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">{t('Huidige waarden van de scheidsrechter')}</p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="font-medium text-xs">{t('Scheidsrechter naam')}</p>
                                <p className="text-xs">{referee.user?.name || t('Onbekende scheidsrechter')}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xs">{t('Email')}</p>
                                <p className="text-xs">{referee.user?.email || t('N/A')}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-xs">{t('Scheidsrechter categorie')}</p>
                            <Badge variant="outline" className="text-xs mt-1">{referee.category}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Award className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">{t('Categorie management')}</p>
                        <p>{t('Je kan de scheidsrechter categorie updaten om deze te reflecteren op hun huidige kwalificaties en certificaten. Dit zal invloed hebben op welke wedstrijden ze kunnen worden toegewezen om te scheidsrechtsbieden.')}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
