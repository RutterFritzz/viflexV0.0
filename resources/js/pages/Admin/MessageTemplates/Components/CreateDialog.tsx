import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
// import CustomCKEditor from '@/components/Assets/ckeditor';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';

export default function CreateDialog() {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        subject: '',
        to_name: '',
        to_email: '',
        bcc: 0,
        content: '',
    });

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.templates.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit">Template toevoegen</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Template toevoegen</DialogTitle>
                </DialogHeader>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name">Naam</Label>
                        <Input
                            id="name"
                            placeholder="Template Naam"
                            value={data.name}
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
                            onCheckedChange={checked => setData('bcc', checked ? 1 : 0)}
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            className="h-54"
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            name="content"
                            id="content"
                            placeholder="Omschrijf je bericht"
                        />
                        {/* <CustomCKEditor
                            height="400px"
                            value={data.content ?? ''}
                            onChange={(value: string) => setData('content', value)}
                        /> */}
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
