import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Referee } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { 
    Gavel, 
    ArrowLeft, 
    Edit, 
    Trash2, 
    User, 
    Award,
    Mail,
    Calendar,
    Clock,
    Trophy
} from "lucide-react";

interface ShowProps {
    referee: Referee;
}

export default function Show({ referee }: ShowProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    // Helper function to get category badge color
    const getCategoryBadge = (category: string) => {
        const categoryColors: Record<string, string> = {
            'Men': 'default',
            'Women': 'secondary',
            'U10': 'outline',
            'U12': 'outline',
            'U14': 'outline',
            'U18': 'outline'
        };
        return categoryColors[category] || 'outline';
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
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
                        {referee.user?.name || 'Unknown Referee'}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <Badge variant={getCategoryBadge(referee.category) as "default" | "secondary" | "outline"}>
                                {referee.category} Referee
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{referee.user?.email || 'No email available'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Referee Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>
                            Basic details about this referee.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Name:</span>
                                <span className="font-medium">{referee.user?.name || 'Unknown'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                                <span className="font-medium">{referee.user?.email || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Category:</span>
                                <Badge variant={getCategoryBadge(referee.category) as "default" | "secondary" | "outline"}>
                                    {referee.category}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Referee ID:</span>
                                <span className="font-medium">#{referee.id}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            Referee Statistics
                        </CardTitle>
                        <CardDescription>
                            Overview of referee activity and performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-primary">{referee.category}</div>
                                <div className="text-sm text-muted-foreground">Specialization</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-secondary">Active</div>
                                <div className="text-sm text-muted-foreground">Status</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-accent">Available</div>
                                <div className="text-sm text-muted-foreground">Availability</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Qualifications & Experience Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Qualifications & Experience
                    </CardTitle>
                    <CardDescription>
                        Referee certifications and experience details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Category Certification</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Certified to officiate {referee.category} level competitions and games.
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Experience Level</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Qualified referee with appropriate training and certification.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-medium">Registration Date</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                This referee has been registered in the system and is available for assignments.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Referee Actions</CardTitle>
                    <CardDescription>
                        Manage referee settings and navigation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('referee.edit', referee.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Referee
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('referee.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Referees
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Referee
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="referee"
                            name={referee.user?.name || 'Unknown Referee'}
                            onOpenChange={setDialogOpen}
                            id={referee.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}