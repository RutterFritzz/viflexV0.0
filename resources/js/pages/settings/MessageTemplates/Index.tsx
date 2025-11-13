import { MessageTemplate } from "@/types";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import DeleteDialog from "@/Components/Assets/DeleteDialog";

import { Card, CardContent } from "@/components/ui/card";
import EditDialog from "./Components/EditDialog";
import CreateDialog from "./Components/CreateDialog";
import Heading from '@/components/heading';

import { Edit2 } from "lucide-react";
import DeleteDialog from "@/components/Assets/DeleteDialog";
import AdminLayout from "@/layouts/AdminLayout";

export default function Index({ messageTemplates }: { messageTemplates: MessageTemplate[] }) {
    return (
        <AdminLayout title="templates">
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

                                        <DeleteDialog routeName="admin.templates.delete" model={messageTemplate} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Paginator data={messageTemplates} /> */}
                </CardContent>
            </Card>
        </AdminLayout>
    )
}
