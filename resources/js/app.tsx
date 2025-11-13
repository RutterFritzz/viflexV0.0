import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import '../lang/i18n';
import { PageModule } from './types';
import MainLayout from './layouts/MainLayout';
import { JSX } from 'react';
import AdminLayout from './layouts/AdminLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // resolve: (name) =>
    //     resolvePageComponent(
    //         `./pages/${name}.tsx`,
    //         import.meta.glob('./pages/**/*.tsx'),
    //     ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },

    resolve: async (name) => {
        const pageModule = await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        );
        const page: PageModule = typeof pageModule === 'function' ? await pageModule() : pageModule;

        console.log(name.startsWith('Admin'))

        // Add default layout if none is set
        page.default.layout ??= (pageContent: JSX.Element) => (
            !!!name.startsWith('Admin')
            ? <MainLayout>{pageContent}</MainLayout>
            : <AdminLayout>{pageContent}</AdminLayout>
        );

        return page;
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
