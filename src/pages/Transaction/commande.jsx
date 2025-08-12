import { useState, useEffect } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./commande.css";

import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack,
  Paper,
  Divider
} from "@mui/material";
import { Phone, Visibility, CheckCircle, Cancel } from "@mui/icons-material";

// Fake données
const initialOrders = [
  {
    id: 120,
    client: "Amine B.",
    service: "Mariage Oran",
    type: "Animateur",
    date: "2025-08-12",
    status: "confirmed",
    urgent: false
  },
  {
    id: 121,
    client: "Sarah M.",
    service: "Spot Radio",
    type: "Voix-off",
    date: "2025-08-13",
    status: "pending",
    urgent: true
  },
  {
    id: 122,
    client: "Hamid K.",
    service: "Casquette Nike",
    type: "Produit",
    date: "2025-08-14",
    status: "canceled",
    urgent: false
  }
];

export default function Commande() {
  const [active] = useState("Commandes");
  const [orders, setOrders] = useState(initialOrders);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Simulation mises à jour en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) => [
        ...prev,
        {
          id: prev.length + 120,
          client: "Client " + (prev.length + 1),
          service: "Nouveau service",
          type: "Formation",
          date: "2025-08-15",
          status: "pending",
          urgent: false
        }
      ]);
    }, 200000);
    return () => clearInterval(timer);
  }, []);

  // Filtrage et recherche
  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Compteurs
  const total = orders.length;
  const confirmed = orders.filter((o) => o.status === "confirmed").length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const canceled = orders.filter((o) => o.status === "canceled").length;

  // Gestion sélection
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Actions groupées
  const bulkUpdateStatus = (status) => {
    setOrders((prev) =>
      prev.map((o) =>
        selected.includes(o.id) ? { ...o, status: status } : o
      )
    );
    setSelected([]);
  };

  const statusChip = (status) => {
    const colors = {
      confirmed: "success",
      pending: "warning",
      canceled: "error"
    };
    const labels = {
      confirmed: "Confirmé",
      pending: "En attente",
      canceled: "Annulé"
    };
    return <Chip label={labels[status]} color={colors[status]} size="small" />;
  };

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />
      <Box className="dashboard" flex={1} p={2}>
        {/* Titre et compteurs */}
        <Typography variant="h4" color="primary" gutterBottom>
          Gestion des commandes
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Chip label={`Total: ${total}`} color="primary" />
          <Chip label={`Confirmées: ${confirmed}`} color="success" />
          <Chip label={`En attente: ${pending}`} color="warning" />
          <Chip label={`Annulées: ${canceled}`} color="error" />
        </Stack>

        {/* Recherche & filtres */}
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Rechercher..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant={filterStatus === "all" ? "contained" : "outlined"}
            onClick={() => setFilterStatus("all")}
          >
            Tous
          </Button>
          <Button
            variant={filterStatus === "confirmed" ? "contained" : "outlined"}
            onClick={() => setFilterStatus("confirmed")}
          >
            Confirmé
          </Button>
          <Button
            variant={filterStatus === "pending" ? "contained" : "outlined"}
            onClick={() => setFilterStatus("pending")}
          >
            En attente
          </Button>
          <Button
            variant={filterStatus === "canceled" ? "contained" : "outlined"}
            onClick={() => setFilterStatus("canceled")}
          >
            Annulé
          </Button>
        </Stack>

        {/* Actions groupées */}
        {selected.length > 0 && (
          <Stack direction="row" spacing={1} mb={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => bulkUpdateStatus("confirmed")}
            >
              Confirmer sélection
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Cancel />}
              onClick={() => bulkUpdateStatus("canceled")}
            >
              Annuler sélection
            </Button>
          </Stack>
        )}

        {/* Tableau des commandes */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={
                      selected.length > 0 &&
                      selected.length === filteredOrders.length
                    }
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? filteredOrders.map((o) => o.id)
                          : []
                      )
                    }
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Urgent</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(o.id)}
                      onChange={() => toggleSelect(o.id)}
                    />
                  </TableCell>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.client}</TableCell>
                  <TableCell>{o.service}</TableCell>
                  <TableCell>{o.type}</TableCell>
                  <TableCell>{o.date}</TableCell>
                  <TableCell>{statusChip(o.status)}</TableCell>
                  <TableCell>
                    {o.urgent ? (
                      <Chip label="Urgent" color="error" size="small" />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton color="success">
                      <Phone />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
