import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from "@/types";

export default function CreateDialog({ roles }: { roles: Role[] }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role_id: "",
        isAdmin: false as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.users.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Gebruiker toevoegen</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nieuwe Gebruiker</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name" className="mb-1">Naam</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-1">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" className="mb-1">Wachtwoord</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="role_id" className="mb-1">Rol</Label>
                        <Select
                            value={data.role_id}
                            onValueChange={(value) => setData("role_id", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecteer een rol">
                                    {roles?.find((role: any) => role.id === Number(data.role_id))?.name}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {roles.map((role: Role) => (
                                    <SelectItem key={`role_${role.id}`} value={String(role.id)}>{role.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role_id} className="mt-2" />
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <Checkbox
                            id="isAdmin"
                            onCheckedChange={(checked: boolean) => setData("isAdmin", checked)}
                        />
                        <Label htmlFor="isAdmin">Admin</Label>
                    </div>

                    <div className="flex justify-end gap-4">
                        <DialogClose>Sluiten</DialogClose>
                        <Button type="submit" disabled={processing}>
                            Toevoegen
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
