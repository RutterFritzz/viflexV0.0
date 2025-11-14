import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
// import CustomCKEditor from '@/components/Assets/ckeditor';
import { Input } from '@/components/ui/input';
import { MessageTemplate } from '@/types';
import { Edit2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import CustomCKEditor from '@/components/Assets/ckeditor';

export default function EditDialog({ messageTemplate, title }: { messageTemplate: MessageTemplate; title: any }) {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        subject: '',
        to_name: '',
        to_email: '',
        bcc: Number(0),
        content: '',
    });

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.templates.update', [messageTemplate]), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        setData({
            name: messageTemplate.name,
            subject: messageTemplate.subject,
            to_name: messageTemplate.to_name,
            to_email: messageTemplate.to_email,
            bcc: Number(messageTemplate.bcc),
            content: messageTemplate.content,
        });
    }, [messageTemplate]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{title}</DialogTrigger>

            <DialogContent className="md:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Template aanpassen #{messageTemplate.id}</DialogTitle>
                </DialogHeader>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name">Naam</Label>

                        <Input
                            id="name"
                            placeholder="Template naam"
                            defaultValue={data.name}
                            onChange={e => {
                                setData('name', e.target.value);
                            }}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="subject">Onderwerp</Label>
                        <Input
                            id="subject"
                            placeholder="Onderwerp"
                            value={data.subject}
                            onChange={e => {
                                setData('subject', e.target.value);
                            }}
                        />
                        <InputError message={errors.subject} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="to_name">Ontvanger naam</Label>
                        <Input
                            id="to_name"
                            placeholder="Custom Website"
                            value={data.to_name}
                            onChange={e => {
                                setData('to_name', e.target.value);
                            }}
                        />
                        <InputError message={errors.to_name} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="to_email">Ontvanger email</Label>
                        <Input
                            id="to_email"
                            placeholder="support@customwebsite.nl"
                            value={data.to_email}
                            onChange={e => {
                                setData('to_email', e.target.value);
                            }}
                        />
                        <InputError message={errors.to_email} />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <Label htmlFor="priority">BCC</Label>

                        <Checkbox
                            checked={Boolean(data.bcc)}
                            onCheckedChange={checked => setData('bcc', Number(checked))}
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="content">Content</Label>

                        <CustomCKEditor
                            height="250px"
                            value={data.content ?? ''}
                            onChange={(value: string) => setData('content', value)}
                        />
                        <InputError message={errors.content} />
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td className="pe-12">Thuis team</td>
                                <td>[HOMETEAM]</td>
                            </tr>
                            <tr>
                                <td className="pe-12">Uit team</td>
                                <td>[AWAYTEAM]</td>
                            </tr>
                            <tr>
                                <td className="pe-12">Locatie</td>
                                <td>[LOCATION]</td>
                            </tr>
                            <tr>
                                <td className="pe-12">Aanvangstijd</td>
                                <td>[ARRIVALTIME]</td>
                            </tr>
                            <tr>
                                <td className="pe-12">Datum</td>
                                <td>[DATE]</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-end items-center gap-x-2">
                        <DialogClose>Annuleren</DialogClose>
                        <Button type="submit">Opslaan</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
