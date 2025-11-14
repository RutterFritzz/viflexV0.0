import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Club, Team, Role, MessageTemplate } from "@/types";
import { Link } from "@inertiajs/react";
import { Users, Building2, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Matches from "./Components/MatchesTab";
import Settings from "./Components/SettingsTab";
import Players from "./Components/PlayersTab";
import Messages from "./Components/Messages";
import MainLayout from '@/layouts/MainLayout';


interface ShowProps {
    team: Team,
    club: Club;
    roles: Role[];
    templates: MessageTemplate[];
}

export default function Show({ team, club, roles, templates }: ShowProps) {
    const { t } = useTranslation();

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto space-y-6 p-6">
                {/* Header Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('club.show', club.id)}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar club')}
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center space-x-4">

                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                                {(team?.logo) ? <img src={String(team?.logo_cache)} alt="logo" className="h-10 w-10" /> : <Users className="h-10 w-10" />}
                                {team?.name}
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                {t('Deel van')} <Link href={route('club.show', club.id)} className="font-medium hover:text-primary transition-colors">{club.name}</Link>
                            </p>
                        </div>
                    </div>

                    <Separator />

                    <Tabs defaultValue="matches">
                        <TabsList>
                            <TabsTrigger value="matches">{t('Wedstrijden')}</TabsTrigger>
                            <TabsTrigger value="players" className="capitalize">{t('spelers')}</TabsTrigger>
                            <TabsTrigger value="settings">{t('Instellingen')}</TabsTrigger>
                            <TabsTrigger value="messages">{t('Berichten')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="matches">
                            <Matches team={team} />
                        </TabsContent>
                        <TabsContent value="players">
                            <Players team={team} />
                        </TabsContent>
                        <TabsContent value="settings">
                            <Settings team={team} roles={roles} />
                        </TabsContent>
                        <TabsContent value="messages">
                            <Messages team={team} templates={templates} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </MainLayout >
    );
}
