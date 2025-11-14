
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useForm, usePage } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Role, User } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "date-fns";
import InputError from "@/components/input-error";
import Header from "@/components/Admin/Header";
import AdminLayout from '@/layouts/AdminLayout';


export default function Edit({ user, roles }: { user: User, roles: Role[] }) {

    const { data, setData, put, processing, errors } = useForm({
        name: user?.name,
        email: user?.email,
        // role_id: String(user?.role_id),
        // isAdmin: Boolean(!!user?.is_admin),
    });

    const resetForm = useForm({ email: user?.email });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.users.update", { user }));
    };

    const resetEmail = (e: React.FormEvent) => {
        e.preventDefault();
        resetForm.post(route("admin.users.reset-password"));
    };
    return (
        <AdminLayout>
            <div>
                <Header title={`Gebruiker ${user?.name}`} />

                <Card>
                    <CardContent>
                        <div className="my-8 space-y-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Label htmlFor="name" className="mb-1">Voornaam</Label>
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

                                {/* <div className="mb-4">
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
                                            <SelectItem value={String(role.id)}>{role.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role_id} className="mt-2" />
                            </div>

                            <div className="mb-4 flex items-center gap-2">
                                <Checkbox
                                    id="isAdmin"
                                    checked={data.isAdmin}
                                    onCheckedChange={(checked) =>
                                        setData("isAdmin", Boolean(checked))
                                    }
                                />
                                <Label htmlFor="isAdmin">Admin</Label>
                            </div> */}
                            </form>
                            <div className="flex justify-end items-center space-x-2">
                                <Button onClick={resetEmail} variant={"link"}>
                                    Wachtwoord vergeten?
                                </Button>

                                <Button onClick={handleSubmit} disabled={processing}>
                                    Opslaan
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
