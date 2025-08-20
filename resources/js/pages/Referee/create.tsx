import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, User } from "@/types";
import { Link } from "@inertiajs/react";
import { Gavel, ArrowLeft, Plus, User as UserIcon, Award } from "lucide-react";
import Search from "@/components/search";
import { useState } from "react";
import axios from "axios";

interface CreateProps {
    categories: Category[];
}

export default function Create({ categories }: CreateProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    const handleUserSelect = (userId: number) => {

        axios.get(route('user', userId), {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        }).then((response) => {
            setSelectedUser(response.data);
        })
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('referee.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Referees
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8" />
                        Add New Referee
                    </h1>
                    <p className="text-muted-foreground">
                        Register a new referee to officiate competitions and games.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Referee Information
                    </CardTitle>
                    <CardDescription>
                        Select a user and assign their referee category.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('referee.store')} method="post" className="space-y-6">
                        <Input type="hidden" name="_token" value={csrf_token} />
                        <Input type="hidden" name="user_id" value={selectedUser?.id ?? ''} />
                        {!selectedUser ? (<div className="space-y-2">
                            <Label htmlFor="user_id" className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                Select User
                            </Label>
                            <Search onSelect={handleUserSelect} type="user" />
                            <p className="text-xs text-muted-foreground">
                                Choose an existing user to register them as a referee.
                            </p>
                        </div>) : (
                            <div className="space-y-2">
                                <Label htmlFor="user_id" className="flex items-center gap-2 border rounded-md p-2">
                                    <UserIcon className="h-4 w-4" />
                                    {selectedUser.name}
                                </Label>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Referee Category
                            </Label>
                            <Select name="category" required>
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
                                Select the category this referee is qualified to officiate.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                Register Referee
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('referee.index')}>
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
                        <Gavel className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Referee Registration</p>
                        <p>Referees must be existing users in the system. They can be assigned to specific categories based on their qualifications and experience level.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
