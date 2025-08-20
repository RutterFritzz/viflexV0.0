import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";
import { Building2, MapPin, ArrowLeft, Plus } from "lucide-react";

export default function Create() {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Clubs
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Building2 className="h-8 w-8" />
                        Create New Club
                    </h1>
                    <p className="text-muted-foreground">
                        Add a new sports club to your organization.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Club Information
                    </CardTitle>
                    <CardDescription>
                        Enter the basic information for the new club.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('club.store')} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Club Name
                            </Label>
                            <Input 
                                id="name"
                                type="text" 
                                name="name" 
                                placeholder="Enter club name (e.g., Downtown Sports Club)" 
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
                                placeholder="Enter location (e.g., New York, NY)" 
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Club
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('club.index')}>
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