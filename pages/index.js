import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/globals.css";

export default function Home() {
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
      clients.map((client) => (client.id === id ? { ...client, payment: !client.payment } : client))
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AK9 CRM - Zarządzanie Klientami</title>
      </Head>

      <header className={styles.header}>
        <Image src="/logo.png" alt="AK9 CRM" width={100} height={50} />
        <h1>Witaj w systemie AK9 CRM</h1>
      </header>

      <main className={styles.main}>
        <h2>Lista Klientów</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.name} - {client.training} - {client.payment ? "Opłacony" : "Nieopłacony"}
              <button onClick={() => togglePayment(client.id)}>Zmień status płatności</button>
            </li>
          ))}
        </ul>

        <h2>Dodaj Nowego Klienta</h2>
        <input
          type="text"
          placeholder="Imię i nazwisko"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rodzaj treningu"
          value={newClient.training}
          onChange={(e) => setNewClient({ ...newClient, training: e.target.value })}
        />
        <button onClick={addClient}>Dodaj klienta</button>
      </main>
    </div>
  );
}
