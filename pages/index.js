import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import "../styles/globals.css";

export default function FitnessCRM() {
    const [clients, setClients] = useState([
        { id: 1, name: "Jan Kowalski", email: "jan@example.com", training: "Siłowy", payment: false, schedule: [] },
        { id: 2, name: "Anna Nowak", email: "anna@example.com", training: "Kardio", payment: true, schedule: [] },
    ]);
    const [newClient, setNewClient] = useState({ name: "", email: "", training: "", payment: false, schedule: [] });
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const addClient = () => {
        setClients([...clients, { ...newClient, id: clients.length + 1 }]);
        setNewClient({ name: "", email: "", training: "", payment: false, schedule: [] });
    };

    const togglePayment = (id) => {
        setClients(
            clients.map(client => client.id === id ? { ...client, payment: !client.payment } : client)
        );
    };

    const addTrainingDate = () => {
        if (selectedClient && selectedDate) {
            setClients(
                clients.map(client =>
                    client.id === selectedClient ? { ...client, schedule: [...client.schedule, selectedDate] } : client
                )
            );
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Witaj w systemie AK9 CRM!</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold">Dodaj nowego klienta</h2>
                    <Input placeholder="Imię i nazwisko" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} />
                    <Input placeholder="Email" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} />
                    <Input placeholder="Rodzaj treningu" value={newClient.training} onChange={e => setNewClient({ ...newClient, training: e.target.value })} />
                    <Button onClick={addClient}>Dodaj klienta</Button>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Lista klientów</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Imię</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Trening</TableCell>
                                <TableCell>Płatność</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell>{client.training}</TableCell>
                                    <TableCell>
                                        <Switch checked={client.payment} onCheckedChange={() => togglePayment(client.id)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
