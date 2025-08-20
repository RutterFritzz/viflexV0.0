import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";
import { Users, ArrowLeft, Plus } from "lucide-react";

interface CreateProps {
    club_id: number;
}

export default function Create({ club_id }: CreateProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.show', club_id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Club
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        Create New Team
                    </h1>
                    <p className="text-muted-foreground">
                        Add a new team to this club.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Team Information
                    </CardTitle>
                    <CardDescription>
                        Enter the basic information for the new team.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('team.store', club_id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="club_id" value={club_id} />

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Team Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter team name (e.g., Senior Team, Youth Squad)"
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Team
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('club.show', club_id)}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}