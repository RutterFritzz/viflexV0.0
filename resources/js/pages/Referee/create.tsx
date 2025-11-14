import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, User } from "@/types";
import { Link } from "@inertiajs/react";
import { Gavel, ArrowLeft, Plus, User as UserIcon, Award } from "lucide-react";
import Search from "@/components/search";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface CreateProps {
    categories: Category[];
}

export default function Create({ categories }: CreateProps) {
    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    const handleUserSelect = (userId: number) => {

        axios.get(route('user', userId), {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        }).then((response) => {
            setSelectedUser(response.data);
        })
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('referee.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar scheidsrechters')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8" />
                        {t('Voeg nieuwe scheidsrechter toe')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('Registreer een nieuwe scheidsrechter om competities en wedstrijden te scheidsrechtsbieden.')}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {t('Scheidsrechter informatie')}
                    </CardTitle>
                    <CardDescription>
                        {t('Selecteer een gebruiker en wijs hun scheidsrechter categorie toe.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('referee.store')} method="post" className="space-y-6">
                        <Input type="hidden" name="_token" value={csrf_token} />
                        <Input type="hidden" name="user_id" value={selectedUser?.id ?? ''} />
                        {!selectedUser ? (<div className="space-y-2">
                            <Label htmlFor="user_id" className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                {t('Selecteer gebruiker')}
                            </Label>
                            <Search onSelect={handleUserSelect} type="user" />
                            <p className="text-xs text-muted-foreground">
                                {t('Kies een bestaande gebruiker om ze als scheidsrechter te registreren.')}
                            </p>
                        </div>) : (
                            <div className="space-y-2">
                                <Label htmlFor="user_id" className="flex items-center gap-2 border rounded-md p-2">
                                    <UserIcon className="h-4 w-4" />
                                    {selectedUser.name}
                                </Label>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                {t('Scheidsrechter categorie')}
                            </Label>
                            <Select name="category" required>
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
                                {t('Selecteer de categorie waar deze scheidsrechter gekwalificeerd is om te scheidsrechtsbieden.')}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                {t('Registreer scheidsrechter')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('referee.index')}>
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
                        <Gavel className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">{t('Scheidsrechter registratie')}</p>
                        <p>{t('Scheidsrechters moeten bestaande gebruikers in het systeem zijn. Ze kunnen worden toegewezen aan specifieke categorieën op basis van hun kwalificaties en ervaringniveau.')}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
