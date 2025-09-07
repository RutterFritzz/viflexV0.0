import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';
import { t } from 'i18next';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('appearanceSettings'),
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('appearanceSettings')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('appearanceSettings')} description={t('updateYourAccountsAppearanceSettings')} />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
