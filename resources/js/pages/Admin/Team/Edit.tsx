import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, Club, Role, Team } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Users, ArrowLeft, Save } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/layouts/AdminLayout";
import GeneralTab from "./Components/GeneralTab";
import PlayersTab from "./Components/PlayersTab";
import Header from "@/components/Admin/Header";


export default function Edit({ team, clubs, roles }: { team: Team, clubs: Club[], roles: Role[] }) {
    const { t } = useTranslation();

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <Header title={`Bewerk team ${team.name}`} modelName="team" />
            </div>

             <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">{t('Algemeen')}</TabsTrigger>
                    <TabsTrigger value="players" className="capitalize">{t('spelers')}</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <GeneralTab team={team} clubs={clubs} />
                </TabsContent>
                <TabsContent value="players">
                    <PlayersTab team={team} roles={roles} />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
