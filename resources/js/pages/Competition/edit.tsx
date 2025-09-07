import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Competition } from "@/types";
import { Link } from "@inertiajs/react";
import { Trophy, ArrowLeft, Save, Tag, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Edit({ competition, categories }: { competition: Competition, categories: Category[] }) {
    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i - 2); // From 2 years ago to 7 years in the future

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('competition.show', competition.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToCompetitions')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {t('editCompetition')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('updateTheInformationFor')} <span className="font-medium">{competition.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('competitionInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('makeChangesToTheCompetitionDetailsBelow')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('competition.update', competition.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                {t('competitionName')}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder={t('enterCompetitionName')}
                                defaultValue={competition.name}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                {t('category')}
                            </Label>
                            <Select name="category" required defaultValue={competition.category}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('selectACategory')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {t('year')}
                            </Label>
                            <Select name="year" required defaultValue={competition.year.toString()}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('selectYear')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {t('updateCompetition')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('competition.show', competition.id)}>
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
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <Trophy className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('currentName')}</p>
                                <p className="text-xs">{competition.name}</p>
                            </div>
                            <div>
                                <Tag className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('currentCategory')}</p>
                                <p className="text-xs">{competition.category}</p>
                            </div>
                            <div>
                                <Calendar className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('currentYear')}</p>
                                <p className="text-xs">{competition.year}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
