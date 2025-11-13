import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function DeleteDialog({ routeName, model, triggerClass, }: { routeName: string; model: any; triggerClass?: string; }) {
    const { delete: destroy } = useForm({});
    const [open, setOpen] = useState(false);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className={triggerClass}>
                <Trash2 className="size-5 hover:cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-black">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Weet je het zeker?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Deze actie kan niet ongedaan gemaakt worden. Weet je zeker dat je dit item wilt verwijderen?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white border-none">
                 Annuleren
                    </AlertDialogCancel>
                    <form
                        method="post"
                        onSubmit={(e) => {
                            e.preventDefault();
                            destroy(route(routeName, model), {
                                onSuccess: () => {
                                    setOpen(false);
                                }
                            });
                        }}
                        className="flex justify-center"
                    >
                        <Button variant={"destructive"} type="submit">
                            Verwijderen
                        </Button>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
