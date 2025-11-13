import { Team, Message } from "@/types";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
// import CustomCKEditor from "@/Components/Assets/ckeditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import CustomCKEditor from "@/components/Assets/ckeditor";

export default function EditMessageDialog({ team, message }: { team: Team, message: Message }) {
    const { data, setData, post, errors, reset } = useForm({
        content: '',
    })

    useEffect(() => {
        setData({
           content: message.content,
        });
    }, [message]);

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("team.message.update", [team, message]), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                    <span className="ms-2 text-xs text-gray-500 font-normal underline cursor-pointer">Edit</span>
            </DialogTrigger>
            <DialogContent className="md:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Bericht aanpassen</DialogTitle>
                </DialogHeader>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="content" className="text-left">
                            Notitie
                        </Label>

                        <CustomCKEditor
                            height="400px"
                            value={data.content ?? ""}
                            onChange={(value: string) => setData("content", value)}
                        />
                        <InputError message={errors.content} />
                    </div>

                    <div className="flex justify-end items-center gap-x-2">
                        <DialogClose>Annuleren</DialogClose>
                        <Button type="submit">Opslaan</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
