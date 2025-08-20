import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Category, Referee } from "@/types";
import { Link } from "@inertiajs/react";
import { Gavel, ArrowLeft, Save, User as UserIcon, Award } from "lucide-react";

interface EditProps {
    referee: Referee;
    categories: Category[];
}

export default function Edit({ referee, categories }: EditProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('referee.show', referee.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Referee
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8" />
                        Edit Referee
                    </h1>
                    <p className="text-muted-foreground">
                        Update the details for referee <span className="font-medium">{referee.user?.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Referee Information
                    </CardTitle>
                    <CardDescription>
                        Make changes to the referee details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('referee.update', referee.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="space-y-2">
                            <Label htmlFor="user_id" className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                Referee User
                            </Label>
                            <div className="p-3 border rounded-md bg-muted/50">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{referee.user?.name}</span>
                                    <span className="text-muted-foreground">({referee.user?.email})</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                The user associated with this referee cannot be changed.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Referee Category
                            </Label>
                            <Select name="category" defaultValue={referee.category} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select referee category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            <div className="flex items-center gap-2">
                                                <Award className="h-3 w-3" />
                                                <span>{category}</span>
                                        </div>
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Update the category this referee is qualified to officiate.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                Update Referee
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('referee.show', referee.id)}>
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
                        <Gavel className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Current Values</p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="font-medium text-xs">Referee Name</p>
                                <p className="text-xs">{referee.user?.name || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xs">Email</p>
                                <p className="text-xs">{referee.user?.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-xs">Current Category</p>
                            <Badge variant="outline" className="text-xs mt-1">{referee.category}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Award className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Category Management</p>
                        <p>You can update the referee's category to reflect their current qualifications and certifications. This will affect which games they can be assigned to officiate.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
