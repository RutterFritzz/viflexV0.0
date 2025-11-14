import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { t } from 'i18next';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('Uiterlijk instellingen'),
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    const { t } = useTranslation();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Uiterlijk instellingen')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('Uiterlijk instellingen')} description={t('Update je account's uiterlijk instellingen')} />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
