
import { cn } from "@/lib/utils"
type LogoVariant = 'oranje' | 'wit';

interface ApplicationLogoProps {
    variant?: LogoVariant;
    className?: string;
    alt?: string;
}

export default function AppLogo({
    variant = 'oranje',
    className = 'h-9',
    alt = 'Logo CustomWebsite'
}: ApplicationLogoProps) {
    const logoSrc = '/images/logos/logo_' + variant + '.png';
    return (
        <img src={logoSrc} alt={alt} className={cn('flex object-cover', className)} />
    );
}
