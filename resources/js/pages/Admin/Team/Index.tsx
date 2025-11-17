import Header from "@/components/Admin/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Club, Team } from "@/types";
import AdminLayout from "@/layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import CreateDialog from "./Components/CreateDialog";
import DeleteDialog from "@/components/Assets/DeleteDialog";
import { Edit2 } from "lucide-react";

export default function Index({ teams, clubs }: { teams: Team[], clubs: Club[] }) {
    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-8">
                <Header title="Teams" modelName="team" />
                <CreateDialog clubs={clubs} />
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
                                    </TableCell>

                                    <TableCell className="flex justify-end items-center gap-x-2">
                                        <Link href={ route('admin.teams.edit', [team])}>
                                        <Edit2 className="w-5 h-5" />
                                        </Link>
                                        {/* <EditDialog messageTemplate={messageTemplate} title={<Edit2 className="size-5 cursor-pointer" />} /> */}
                                        <DeleteDialog routeName="admin.teams.delete" model={team} />
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
