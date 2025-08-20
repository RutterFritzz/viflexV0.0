import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Gameday, Location } from "@/types";
import { Link } from "@inertiajs/react";
import { Calendar, ArrowLeft, Save, MapPin, Building2 } from "lucide-react";
import { formatDate } from "@/helpers/format-date";
import { useState } from "react";
import { Calendar22 } from "@/components/calender";

interface EditProps {
    gameday: Gameday;
    locations: Location[];
}

export default function Edit({ gameday, locations }: EditProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [date, setDate] = useState<Date | undefined>(new Date(gameday.date));

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('gameday.show', gameday.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Gameday
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calendar className="h-8 w-8" />
                        Edit Gameday
                    </h1>
                    <p className="text-muted-foreground">
                        Update the details for the gameday on <span className="font-medium">{formatDate(gameday.date)}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Gameday Information
                    </CardTitle>
                    <CardDescription>
                        Make changes to the gameday details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('gameday.update', gameday.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="space-y-2">
                            <Label htmlFor="date" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Event Date
                            </Label>
                            <Calendar22 date={date} setDate={setDate} className="w-full" />
                                <Input type="hidden" name="date" value={date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''} />
                            <p className="text-xs text-muted-foreground">
                                Select the date for this gameday event.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location_id" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Venue Location
                            </Label>
                            <Select name="location_id" defaultValue={gameday.location_id.toString()} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a venue" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location.id} value={location.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-3 w-3" />
                                                <span>{location.name}</span>
                                                <span className="text-muted-foreground">({location.city})</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Choose the venue where this gameday will take place.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                Update Gameday
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('gameday.show', gameday.id)}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Current Values Display */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Calendar className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Current Values</p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="font-medium text-xs">Event Date</p>
                                <p className="text-xs">{formatDate(gameday.date)}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xs">Venue</p>
                                <Badge variant="outline" className="text-xs">{gameday.location?.name}</Badge>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-xs">City</p>
                            <p className="text-xs">{gameday.location?.city}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Available Venues Card */}
            {locations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Available Venues</CardTitle>
                        <CardDescription>
                            Venues you can select for this gameday.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            {locations.map((location) => (
                                <div key={location.id} className="flex items-center justify-between p-2 border rounded text-sm">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-3 w-3 text-muted-foreground" />
                                        <span className="font-medium">{location.name}</span>
                                    </div>
                                    <span className="text-muted-foreground">{location.city}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
