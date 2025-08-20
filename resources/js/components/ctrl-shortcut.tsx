import { useEffect, useState } from "react";

export default function CtrlShortcut({ char = 'K' }: { char?: string }) {
    function useOperatingSystem() {
        const [os, setOs] = useState<'mac' | 'windows' | 'linux' | 'unknown'>('unknown');

        useEffect(() => {
            const userAgent = navigator.userAgent.toLowerCase();

            if (userAgent.includes('mac')) {
                setOs('mac');
            } else if (userAgent.includes('win')) {
                setOs('windows');
            } else if (userAgent.includes('linux')) {
                setOs('linux');
            } else {
                setOs('unknown');
            }
        }, []);

        return os;
    }

    const os = useOperatingSystem();

    return (
        <span className="text-xs">
            {os === 'mac' ? '⌘' : os === 'windows' ? 'Ctrl' : 'Ctrl'} <span className="text-xs">+</span> {char}
        </span>
    );
}