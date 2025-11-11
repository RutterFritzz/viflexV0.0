import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, Team } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Users, ArrowLeft, Save } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Edit({ team }: { team: Team }) {
    const { t } = useTranslation();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(team.logo_cache);
    const categories = ["Men", "Women", "U10", "U12", "U14", "U18"]

    const { data, setData, post, processing, errors, reset } = useForm({
        name: team.name,
        category: team.category,
        travel_time: team.travel_time,
        logo: (team.logo_cache as unknown) as File
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData("logo", file);
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('team.update', [team]));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('team.show', team.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToTeam')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        {t('editTeam')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('updateTheInformationFor')} <span className="font-medium">{team.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('teamInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('makeChangesToTheTeamDetailsBelow')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method="post" className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {t('teamName')}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder={t('enterTeamName')}
                                defaultValue={team.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {t('travelTime')}
                            </Label>
                            <Input
                                id="travel_time"
                                type="text"
                                name="travel_time"
                                defaultValue={team.travel_time}
                                onChange={(e) => setData("travel_time", e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                Categorie
                            </Label>
                            <Select
                                value={data.category}
                                onValueChange={(value: Category) => setData("category", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecteer een category">
                                        {categories?.find((category: any) => category.id === data.category)}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={`category_${category}`} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-x-4 space-y-4">
                            <Label htmlFor="logo" className="mb-2">Logo</Label>

                            <Input id="logo" type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

                            <Button type="button" variant="outline" onClick={handleSelectImage} className="w-fit">
                                Logo selecteren
                            </Button>

                            {(logoPreview || data.logo) && (
                                <div className="relative h-auto w-auto max-w-24 border rounded-md overflow-hidden mb-2">
                                    <img src={logoPreview ?? String(data.logo)} alt="Preview" className="object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {t('updateTeam')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('team.show', team.id)}>
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
