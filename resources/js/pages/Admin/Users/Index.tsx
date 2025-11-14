import AdminLayout from "@/layouts/AdminLayout";
import Header from "@/components/Admin/Header";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
// import Paginator from "@/components/Assets/Paginator";

import CreateDialog from "./Components/CreateDialog";
import DeleteDialog from "@/components/Assets/DeleteDialog";

import { Link, usePage } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";
import { User, Role } from "@/types";

export default function Index({ users, roles }: { users: User[], roles: Role[] }) {
    return (
        <AdminLayout>
            <div>
                <Header title="Gebruikers" modelName="gebruiker" />

                <div className="my-8 flex justify-end">
                    <CreateDialog roles={roles} />
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Naam</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead colSpan={2}></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user: any) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Link href={route('admin.users.edit', user)}>
                                                {user.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="flex justify-end items-center gap-x-2">
                                            <Link href={route('admin.users.edit', user)}>
                                                <PencilIcon className="size-5" />
                                            </Link>

                                            <DeleteDialog routeName="admin.users.delete" model={[user]} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {/* <Paginator data={users} /> */}
            </div>
        </AdminLayout>
    );
}
