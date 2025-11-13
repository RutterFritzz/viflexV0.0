import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Club, Team, Role } from "@/types";
import { Link } from "@inertiajs/react";
import { Users, Building2, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./Components/General";
import Settings from "./Components/Settings";
import Players from "./Components/Players";

interface ShowProps {
    team: Team,
    club: Club;
    roles: Role[];
}

export default function Show({ team, club, roles }: ShowProps) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [initialTeam, setInitialTeam] = useState(team);

    const handleUserSelect = (userId: number) => {
        const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        axios.post(route('team.add-player', [team]), {
            user_id: userId,
            team_id: team?.id,
            role_id: 1,
        }, {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        })
    }

    const handleCoachSelect = (userId: number) => {
        const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        // axios.post(route('team?.add-coach', team?.id), {
        //     user_id: userId,
        //     team_id: team?.id,
        //     role_id: 2,
        // }, {
        //     headers: {
        //         'X-CSRF-TOKEN': csrf_token
        //     }
        // })
    }

    const handleTeamValueDelete = (teamValue: TeamValue) => {
        axios.delete(route('team?.teamValue.destroy', [team, teamValue]));
    }

    useEffect(() => {
        setInitialTeam(team);
    }, [team]);

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.show', club.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToClub')}
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
                            {t('partOf')} <Link href={route('club.show', club.id)} className="font-medium hover:text-primary transition-colors">{club.name}</Link>
                        </p>
                    </div>

                </div>
            </div>

            <Separator />

            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">{t('general')}</TabsTrigger>
                    <TabsTrigger value="players">{t('players')}</TabsTrigger>
                    <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <General team={team} />
                </TabsContent>
                <TabsContent value="players">
                    <Players team={team} />
                </TabsContent>
                <TabsContent value="settings">
                    <Settings team={team} roles={roles} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
