import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogDescription, DialogFooter } from "./ui/dialog";
import { Team } from "@/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { CheckIcon, XIcon } from "lucide-react";

export default function PresenceSubmit({ children, team }: { children: React.ReactNode, team: Team }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Presence Submit</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Please select the presence for the team {team.name}
                </DialogDescription>
                <div className="flex flex-col gap-2 mb-5">
                    <p className="text-sm text-muted-foreground">Coaches</p>
                    {team.coaches?.map((coach) => (
                        <div key={coach.id} className="flex items-center gap-2">
                            <RadioGroup className="flex gap-5 items-center">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value={`${coach.id.toString()}-true`} className="sr-only peer" id={`${coach.id.toString()}-true`}></RadioGroupItem>
                                    <Label htmlFor={`${coach.id.toString()}-true`} className="cursor-pointer hover:text-success transition-colors duration-200 peer-data-[state=checked]:text-success border peer-data-[state=checked]:border-success text-black p-2 rounded-md">
                                        <CheckIcon className="size-4" />
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value={`${coach.id.toString()}-false`} className="sr-only peer" id={`${coach.id.toString()}-false`}></RadioGroupItem>
                                    <Label htmlFor={`${coach.id.toString()}-false`} className="cursor-pointer hover:text-destructive transition-colors duration-200 peer-data-[state=checked]:text-destructive border peer-data-[state=checked]:border-destructive text-black p-2 rounded-md">
                                        <XIcon className="size-4" />
                                    </Label>
                                </div>
                            </RadioGroup>
                            <p>{coach.name}</p>
                        </div>
                    ))}
                    <p className="text-sm text-muted-foreground">Players</p>
                    {team.players?.map((player) => (
                        <div key={player.id} className="flex items-center gap-2">
                            <RadioGroup className="flex gap-5 items-center">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value={`${player.id.toString()}-true`} className="sr-only peer" id={`${player.id.toString()}-true`}></RadioGroupItem>
                                    <Label htmlFor={`${player.id.toString()}-true`} className="cursor-pointer hover:text-success transition-colors duration-200 peer-data-[state=checked]:text-success border peer-data-[state=checked]:border-success text-black p-2 rounded-md">
                                        <CheckIcon className="size-4" />
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value={`${player.id.toString()}-false`} className="sr-only peer" id={`${player.id.toString()}-false`}></RadioGroupItem>
                                    <Label htmlFor={`${player.id.toString()}-false`} className="cursor-pointer hover:text-destructive transition-colors duration-200 peer-data-[state=checked]:text-destructive border peer-data-[state=checked]:border-destructive text-black p-2 rounded-md">
                                        <XIcon className="size-4" />
                                    </Label>
                                </div>
                            </RadioGroup>
                            <p>{player.name}</p>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}