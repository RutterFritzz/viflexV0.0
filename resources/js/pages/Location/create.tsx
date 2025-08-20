import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";
import { MapPin, ArrowLeft, Plus, Building2, Map } from "lucide-react";

export default function Create() {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('location.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Locations
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="h-8 w-8" />
                        Add New Location
                    </h1>
                    <p className="text-muted-foreground">
                        Create a new sports venue or location for games and events.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Location Information
                    </CardTitle>
                    <CardDescription>
                        Enter the details for the new location.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('location.store')} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Venue Name
                            </Label>
                            <Input 
                                id="name"
                                type="text" 
                                name="name" 
                                placeholder="Enter venue name (e.g., Central Stadium, Sports Complex)" 
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city" className="flex items-center gap-2">
                                <Map className="h-4 w-4" />
                                City
                            </Label>
                            <Input 
                                id="city"
                                type="text" 
                                name="city" 
                                placeholder="Enter city name" 
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Location
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('location.index')}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Building2 className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Location Management</p>
                        <p>Locations are used to specify where games and events take place. You can create multiple venues in different cities.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
