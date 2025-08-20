import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import {
    TrophyIcon,
    Users,
    Building2,
    ArrowRight,
    CheckCircle,
    Star,
    Target,
    BarChart3,
    Calendar,
    MessageSquare,
    Shield
} from "lucide-react";
import { SharedData } from "@/types";
import AppLogoIconTest from "@/components/app-logo-icon-test";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: Building2,
            title: "Club Management",
            description: "Organize your sports clubs with ease. Manage multiple teams, track member information, and streamline administrative tasks."
        },
        {
            icon: Users,
            title: "Team Organization",
            description: "Create and manage teams within your clubs. Assign players, coaches, and track team performance and statistics."
        },
        {
            icon: Calendar,
            title: "Event Scheduling",
            description: "Schedule games, practices, and events. Keep everyone informed with automated notifications and calendar integration."
        },
        {
            icon: BarChart3,
            title: "Performance Analytics",
            description: "Track team and player performance with detailed analytics. Make data-driven decisions to improve results."
        },
        {
            icon: MessageSquare,
            title: "Communication Hub",
            description: "Keep your team connected with integrated messaging, announcements, and real-time updates."
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Your data is protected with enterprise-grade security. Reliable infrastructure ensures 99.9% uptime."
        }
    ];

    const benefits = [
        "Streamlined club and team management",
        "Real-time collaboration tools",
        "Comprehensive performance tracking",
        "Mobile-responsive design",
        "Secure data protection",
        "24/7 customer support"
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32 h-[calc(100vh-4rem)]">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge variant="secondary" className="mb-6 text-sm font-medium">
                            <Star className="w-3 h-3 mr-1" />
                            The Complete Sports Management Platform
                        </Badge>

                        <div className="size-1/2 mx-auto">
                            <AppLogoIconTest className="w-full mb-6" />
                        </div>

                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                            Manage Your Sports
                            <span className="text-primary"> Organization</span>
                            <br />
                            Like a Pro
                        </h1>

                        <p className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto">
                            From local clubs to professional organizations, Viflex provides everything you need
                            to manage teams, track performance, and build winning communities.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            {auth.user ? (
                                <Button asChild size="lg" className="text-lg px-8 py-6">
                                    <Link href="/dashboard">
                                        <TrophyIcon className="w-5 h-5 mr-2" />
                                        Go to Dashboard
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild size="lg" className="text-lg px-8 py-6">
                                        <Link href="/register">
                                            Get Started Free
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                                        <Link href="/login">
                                            Sign In
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {!auth.user && (
                            <p className="mt-6 text-sm text-muted-foreground">
                                No credit card required • Free forever plan available
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                            Everything You Need to
                            <span className="text-primary"> Succeed</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Powerful features designed specifically for sports organizations of all sizes.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 lg:py-32 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                                Why Choose
                                <span className="text-primary"> Viflex?</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Join thousands of sports organizations who trust Viflex to manage their operations,
                                improve performance, and build stronger communities.
                            </p>

                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-2xl font-bold mb-2">10,000+</div>
                                <div className="text-sm text-muted-foreground">Teams Managed</div>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-secondary" />
                                </div>
                                <div className="text-2xl font-bold mb-2">50,000+</div>
                                <div className="text-sm text-muted-foreground">Active Users</div>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-accent" />
                                </div>
                                <div className="text-2xl font-bold mb-2">1,500+</div>
                                <div className="text-sm text-muted-foreground">Sports Clubs</div>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrophyIcon className="w-8 h-8 text-success" />
                                </div>
                                <div className="text-2xl font-bold mb-2">99.9%</div>
                                <div className="text-sm text-muted-foreground">Uptime</div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!auth.user && (
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-6">
                        <Card className="mx-auto max-w-4xl border-0 shadow-2xl bg-gradient-to-r from-primary/5 to-secondary/5">
                            <CardContent className="p-12 text-center">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    Join the thousands of sports organizations already using Viflex to streamline
                                    their operations and focus on what matters most.
                                </p>
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                    <Button asChild size="lg" className="text-lg px-8 py-6">
                                        <Link href="/register">
                                            Start Your Free Trial
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                                        <Link href="/contact">
                                            Schedule a Demo
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            )}
        </div>
    );
}