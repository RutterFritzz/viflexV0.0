import { Card, CardContent } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { Crown, User, Users, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Team, Message } from '@/types';
import { useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import EditMessageDialog from './EditMessageDialog';
import CustomCKEditor from '@/components/Assets/ckeditor';

// import CustomCKEditor from '@/Components/Assets/ckeditor';

export default function Messages({ team }: { team: Team }) {
    const { t } = useTranslation();

    const { data, setData, post, errors, reset } = useForm({
        content: ''
    });

    console.log(team)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('team.message.send', [team]), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} method="post" className="space-y-2">
                    <Label htmlFor="content" className="text-left">
                        Berichten
                    </Label>

                    <CustomCKEditor height="400px" value={data.content} onChange={e => setData('content', e)} />

                    <div className="flex justify-end">
                        <Button type="submit">Opslaan</Button>
                    </div>
                </form>

                <div className="space-y-8">
                    {team?.messages?.map((message: Message) => (
                        <div key={message.id}>
                            <div className="flex items-center gap-x-2">
                                <p className="font-bold">{message.user.name}</p>

                                <div className="text-xs text-gray-500 font-normal">
                                    <span>{message.created_at}</span>

                                    <EditMessageDialog team={team} message={message} />
                                </div>
                                {/* {!message.visable && <EyeOff className="h-4 w-4" />} */}
                            </div>

                            <div
                                className="prose bg-gray-50 my-2 p-4"
                                dangerouslySetInnerHTML={{ __html: message.content }}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
