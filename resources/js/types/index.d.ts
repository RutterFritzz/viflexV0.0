import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Club {
    id: number;
    name: string;
    location: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Team {
    id: number;
    name: string;
    players: User[] | null;
    coaches: User[] | null;
    category: Category;
}

export type Category = "Men" | "Women" | "U10" | "U12" | "U14" | "U18";

export interface Competition {
    id: number;
    name: string;
    category: Category;
    year: number;
    teams?: Team[];
}

export interface Location {
    id: number;
    name: string;
    city: string;
}

export interface Gameday {
    id: number;
    location_id: number;
    date: Date;
    location?: Location;
    games?: Game[];
    games_count?: number;
    teams?: Team[];
}

export interface Game {
    id: number;
    competition_id: number;
    home_team_id: number;
    away_team_id: number;
    home_team_score: number | null;
    away_team_score: number | null;
    location_id: number;
    time: string;
    competition?: Competition;
    home_team?: Team;
    away_team?: Team;
    homeTeam?: Team;
    awayTeam?: Team;
    location?: Location;
    gameday?: Gameday;
    home_coach?: User | null;
    away_coach?: User | null;
    home_team_users?: User[] | null;
    away_team_users?: User[] | null;
    home_referee?: User | null;
    away_referee?: User | null;
}

export interface Referee {
    id: number;
    user_id: number;
    category: Category;
    user?: User;
}

export type PageModule = {
    default: React.ComponentType<Record<string, unknown>> & {
        layout?: (pageContent: JSX.Element) => JSX.Element;
    };
};

export interface PresenceData {
    coaches: { [userId: string]: boolean };
    players: { [userId: string]: boolean };
}