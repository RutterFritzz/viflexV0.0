import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { Crown, User, Users, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Team, Message, MessageTemplate, Game } from '@/types';
import { useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import EditMessageDialog from '../../Team/Components/EditMessageDialog';
import CustomCKEditor from '@/components/Assets/ckeditor';
import InputError from '@/components/input-error';
import { useEffect } from 'react';
import DeleteDialog from '@/components/Assets/DeleteDialog';

// import CustomCKEditor from '@/Components/Assets/ckeditor';

export default function Messages({ game, templates }: { game: Game, templates: MessageTemplate[] }) {
    const { t } = useTranslation();

    const { data, setData, post, errors, reset } = useForm({
        template: '',
        content: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('game.message.send', [game]), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        const template = templates?.find((template) => template.id === Number(data.template))
        setData('content', template?.content ?? '')
    }, [data.template])

    return (
        <Card>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} method="post" className="space-y-2">
                    <div className="mb-4">
                        <Label htmlFor="template" className="mb-1">Template</Label>
                        <Select
                            value={data.template}
                            onValueChange={(value) => setData("template", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecteer een template">
                                    {templates?.find((template: MessageTemplate) => template.id === Number(data.template))?.name}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {templates.map((template: MessageTemplate) => (
                                    <SelectItem key={`template_${template.id}`} value={String(template.id)}>{template.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.template} className="mt-2" />
                    </div>

                    <CustomCKEditor height="400px" value={data.content} onChange={e => setData('content', e)} />

                    <div className="flex justify-end">
                        <Button type="submit">Opslaan</Button>
                    </div>
                </form>

                <div className="space-y-8">
                    {game?.messages?.map((message: Message) => (
                        <div key={message.id}>
                            <div className="flex items-center gap-x-2">
                                <p className="font-bold">{message.user.name}</p>

                                <div className="text-xs text-gray-500 font-normal">
                                    <span>{message.created_at}</span>

                                    {/* <EditMessageDialog game={game} message={message} /> */}
                                    {/* <DeleteDialog routeName="team.message.delete" model={message} /> */}
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
