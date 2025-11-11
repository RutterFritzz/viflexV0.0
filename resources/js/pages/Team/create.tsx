import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { Users, ArrowLeft, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Category } from "@/types";
import { useRef, useState } from "react";

interface CreateProps {
    club_id: number;
}

export default function Create({ club_id }: CreateProps) {
    const { t } = useTranslation();

    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const categories = ["Men", "Women", "U10", "U12", "U14", "U18"]

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
     const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category: "",
        club_id: club_id,
        travel_time: "",
        logo: null as File | null
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
        console.log(data)
        post(route('team.store', club_id));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.show', club_id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToClub')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        {t('createNewTeam')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('addANewTeamToThisClub')}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {t('teamInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('enterTheBasicInformationForTheNewTeam')}
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
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder={t('enterTeamName')}
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
                                value={data.travel_time}
                                onChange={(e) => setData("travel_time", e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                Categorie
                            </Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) => setData("category", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecteer een category">
                                        {categories?.find((category: any) => category.id === Number(data.category))}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={`category_${category}`} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div> */}

                         <div className="flex items-center gap-x-4">
                            <Label htmlFor="logo">Logo</Label>

                            <Input id="logo" type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

                            <Button type="button" variant="outline" onClick={handleSelectImage} className="w-fit">
                                Logo selecteren
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-2">
                            {(logoPreview || data.logo) && (
                                <div className="relative h-auto w-auto max-w-48 border rounded-md overflow-hidden">
                                    <img src={logoPreview ?? String(data.logo)} alt="Preview" className="object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                {t('createTeam')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('club.show', club_id)}>
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
