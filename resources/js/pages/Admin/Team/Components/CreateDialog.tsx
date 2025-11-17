import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Club } from "@/types";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CreateDialog({clubs}: { clubs: Club[]}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const categories = ["Men", "Women", "o10", "o12", "o14", "o18"]

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category_id: "",
        club_id: "",
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
        post(route('admin.teams.store'), {
            onSuccess: () => {
                reset();
                setLogoPreview(null);
                setOpen(false);
            },
        });
    };

    console.log(data)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Team toevoegen</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nieuwe team</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="name" className="mb-1">Naam</Label>

                        <Input
                            id="name"
                            value={data.name}
                            required
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="category_id" className="flex items-center gap-2">
                            {t('Categorie')}
                        </Label>

                        <Select name="category_id" onValueChange={(value) => setData('category_id', value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder={t('Selecteer een categorie')} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="club_id" className="flex items-center gap-2">
                            {t('Club')}
                        </Label>
                        <Select name="club_id" onValueChange={(value) => setData('club_id', value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder={t('Selecteer een club')} />
                            </SelectTrigger>
                            <SelectContent>
                                {clubs.map((club) => (
                                    <SelectItem key={club.id} value={club.id.toString()}>
                                        {club.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.club_id} className="mt-2" />
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="travel_time" className="mb-1">Reistijd</Label>

                        <Input
                            id="trvel_time"
                            value={data.travel_time}
                            required
                            onChange={(e) => setData("travel_time", e.target.value)}
                        />
                        <InputError message={errors.travel_time} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-x-4 mb-4">
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

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Toevoegen
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
