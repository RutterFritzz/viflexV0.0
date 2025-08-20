import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface DeleteConfirmationProps {
    dialogOpen: boolean;
    type: 'club' | 'team' | 'competition' | 'game' | 'location' | 'gameday' | 'referee';
    name: string;
    onOpenChange: (open: boolean) => void;
    id: number;
}

export default function DeleteConfirmation({ dialogOpen, type, name, onOpenChange, id }: DeleteConfirmationProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const [input, setInput] = useState('');

    useEffect(() => {
        setInput('');
    }, [dialogOpen]);

    return (
        <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this {type}?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <p>If you are sure you want to delete this {type}, please enter <span className="font-bold">{name}</span> below.</p>
                    <Input type="text" placeholder={`${type} name`} value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
                <DialogFooter className="flex justify-between gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <form action={route(`${type}.destroy`, id)} method="post" className="ml-auto">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="DELETE" />
                        <Button variant="destructive" className="w-fit" disabled={input !== name} type="submit" onClick={(e) => input !== name ? e.preventDefault() : null}>Delete {type}</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}