import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role } from "@/types";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EditDialog({ role }: { role: Role }) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: role?.name
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.roles.update", { role }), {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="hover:cursor-pointer">{role.name}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bewerk {role.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name" className="mb-1">Naam</Label>
                        <Input id="name" required value={data.name} onChange={(e) =>
                            setData("name", e.target.value)
                        } />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Opslaan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
