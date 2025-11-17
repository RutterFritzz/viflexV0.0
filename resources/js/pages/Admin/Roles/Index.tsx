import Header from "@/components/Admin/Header";
import AdminLayout from "@/layouts/AdminLayout";
import CreateDialog from "./Components/CreateDialog";
import EditDialog from "./Components/EditDialog";
import DeleteDialog from "@/components/Assets/DeleteDialog";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

import { Role } from "@/types";

export default function Index({ roles }: { roles: Role[] }) {
    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-8">
                <Header title="Rollen" modelName="rol" />

                <div className="flex justify-end">
                    <CreateDialog />
                </div>
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
                            {roles.map((role: Role) => (
                                <TableRow key={role.id}>
                                    <TableCell>
                                        <EditDialog role={role} />

                                    </TableCell>

                                    <TableCell className="flex justify-end items-center gap-x-2">
                                        <DeleteDialog routeName="admin.roles.delete" model={role} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminLayout>
    )
}
