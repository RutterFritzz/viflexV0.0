import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import 'flag-icons/css/flag-icons.min.css';

export default function LanguageSwitcher() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    };

    return (
        <Select
            value={i18n.language}
            onValueChange={(value) => changeLanguage(value)}
        >
            <SelectTrigger className="w-fit">
                <SelectValue placeholder={t('selectLanguage')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en"><span className="fi fi-gb mr-2"></span>English</SelectItem>
                <SelectItem value="nl"><span className="fi fi-nl mr-2"></span>Nederlands</SelectItem>
            </SelectContent>
        </Select>
    );
}