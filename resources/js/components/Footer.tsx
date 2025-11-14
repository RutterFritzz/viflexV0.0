import { Link } from "@inertiajs/react";
import { Separator } from "./ui/separator";
import { TrophyIcon, HeartIcon, Building2, Users, Settings, HelpCircle } from "lucide-react";
import LanguageSwitcher from "./Language-switcher";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <TrophyIcon className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">Viflex</span>
                        </div>
                        <LanguageSwitcher />
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <span>Made with</span>
                            <HeartIcon className="w-3 h-3 text-red-500 fill-current" />
                            <span>for sports communities</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">{t('Navigatie')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/club"
                                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                >
                                    <Building2 className="w-3 h-3" />
                                    {t('Clubs')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/team"
                                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                >
                                    <Users className="w-3 h-3" />
                                    {t('Teams')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                >
                                    <TrophyIcon className="w-3 h-3" />
                                    {t('Dashboard')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">{t('Account')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/settings/profile"
                                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                >
                                    <Settings className="w-3 h-3" />
                                    {t('Instellingen')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/help"
                                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                >
                                    <HelpCircle className="w-3 h-3" />
                                    {t('Help')} & {t('Support')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">{t('Legal')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t('Privacyverklaring')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t('Servicevoorwaarden')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t('Contacteer ons')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="text-xs text-muted-foreground">
                        © {currentYear} Viflex. {t('Alle rechten voorbehouden.')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {t('Versie')} 1.0.0 • {t('Gebouwd met')} Laravel & React
                    </div>
                </div>
            </div>
        </footer>
    );
}
