import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";
import { Link } from "@inertiajs/react";
import { Trophy, ArrowLeft, Plus, Tag, Calendar } from "lucide-react";

export default function Create({ categories }: { categories: Category[] }) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i - 2); // From 2 years ago to 7 years in the future

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('competition.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Competitions
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        Create New Competition
                    </h1>
                    <p className="text-muted-foreground">
                        Set up a new competition or tournament.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Competition Information
                    </CardTitle>
                    <CardDescription>
                        Enter the basic information for the new competition.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('competition.store')} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                Competition Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter competition name (e.g., Summer Championship 2024)"
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Category
                            </Label>
                            <Select name="category" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Year
                            </Label>
                            <Select name="year" required defaultValue={currentYear.toString()}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Competition
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('competition.index')}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Trophy className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Competition Setup</p>
                        <p>After creating the competition, you'll be able to add teams, schedule matches, and manage the tournament structure.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
