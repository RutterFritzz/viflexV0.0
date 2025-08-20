import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Club } from "@/types";
import { Link } from "@inertiajs/react";
import { Building2, MapPin, ArrowLeft, Save } from "lucide-react";

export default function Edit({ club }: { club: Club }) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.show', club.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Club
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Building2 className="h-8 w-8" />
                        Edit Club
                    </h1>
                    <p className="text-muted-foreground">
                        Update the information for <span className="font-medium">{club.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Club Information
                    </CardTitle>
                    <CardDescription>
                        Make changes to the club details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('club.update', club.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />
                        
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Club Name
                            </Label>
                            <Input 
                                id="name"
                                type="text" 
                                name="name" 
                                placeholder="Enter club name" 
                                defaultValue={club.name}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Location
                            </Label>
                            <Input 
                                id="location"
                                type="text" 
                                name="location" 
                                placeholder="Enter location" 
                                defaultValue={club.location}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                Update Club
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('club.show', club.id)}>
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