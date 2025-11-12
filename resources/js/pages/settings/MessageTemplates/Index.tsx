import SettingsLayout from "@/layouts/settings/layout";
import { MessageTemplate } from "@/types/settings";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import DeleteDialog from "@/Components/Assets/DeleteDialog";

import { Card, CardContent } from "@/components/ui/card";
import EditDialog from "./Components/EditDialog";
import CreateDialog from "./Components/CreateDialog";
import Heading from '@/components/heading';

import { Edit2 } from "lucide-react";
import DeleteDialog from "@/components/Assets/DeleteDialog";

export default function Index({ messageTemplates }: { messageTemplates: MessageTemplate[] }) {
    return (
        <SettingsLayout header={
            <div className="flex justify-between px-2">
                <Heading title="Templates" />
                <CreateDialog />
            </div>
        }>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Naam</TableHead>
                                <TableHead colSpan={2}></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messageTemplates.map((messageTemplate: any) => (
                                <TableRow key={messageTemplate.id}>
                                    <TableCell>
                                        <EditDialog messageTemplate={messageTemplate} title={<p className="cursor-pointer">{messageTemplate.name}</p>} />

                                    </TableCell>

                                    <TableCell className="flex justify-end items-center gap-x-2">
                                        <EditDialog messageTemplate={messageTemplate} title={<Edit2 className="size-5 cursor-pointer" />} />

                                        <DeleteDialog routeName="settings.templates.delete" model={messageTemplate} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Paginator data={messageTemplates} /> */}
                </CardContent>
            </Card>
        </SettingsLayout>
    )
}
