import Header from "@/components/Admin/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Team } from "@/types";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Index({ teams }: { teams: Team[] }) {
    return (
        <AdminLayout>
            <Header title="Teams" modelName="team" />

            <div className="my-8 flex justify-end">
                {/* <Link>Create</Link> */}
                {/* <CreateDialog /> */}
            </div>

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
                            {teams.map((team: any) => (
                                <TableRow key={team.id}>
                                    <TableCell>
                                        <Link href={ route('admin.teams.edit', [team])}>{team.name}</Link>
                                        {/* <EditDialog messageTemplate={messageTemplate} title={<p className="cursor-pointer">{messageTemplate.name}</p>} /> */}

                                    </TableCell>

                                    <TableCell className="flex justify-end items-center gap-x-2">
                                        {/* <EditDialog messageTemplate={messageTemplate} title={<Edit2 className="size-5 cursor-pointer" />} /> */}

                                        {/* <DeleteDialog routeName="admin.templates.delete" model={messageTemplate} /> */}
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
