import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Edit, Delete, Visibility, Add } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const mockClients = [
  {
    id: 1,
    nom: "Ali Benali",
    entreprise: "Événementiel DZ",
    email: "ali@eventdz.com",
    telephone: "0550 123 456",
    wilaya: "Alger",
    commandes: 5,
    montant: 120000,
    conventions: 2,
  },
  {
    id: 2,
    nom: "Sarah Bouzid",
    entreprise: "Agence Pub 213",
    email: "sarah@pub213.dz",
    telephone: "0770 987 654",
    wilaya: "Oran",
    commandes: 3,
    montant: 85000,
    conventions: 1,
  },
  {
    id: 3,
    nom: "Amine Lounes",
    entreprise: "Événementiel DZ",
    email: "amine@eventdz.com",
    telephone: "0560 456 789",
    wilaya: "Alger",
    commandes: 2,
    montant: 60000,
    conventions: 1,
  },
];

// Statistiques calculées
const wilayaStats = [
  { wilaya: "Alger", count: 2 },
  { wilaya: "Oran", count: 1 },
];

const entrepriseStats = [
  { entreprise: "Événementiel DZ", count: 2 },
  { entreprise: "Agence Pub 213", count: 1 },
];

export default function Client() {
  const [active] = useState("Clients");
  const navigate = useNavigate();

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />
      <Box className="dashboard" flex={1} p={4}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" color="primary" gutterBottom>
              Gestion des Clients
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Liste des clients enregistrés dans la plateforme.
            </Typography>
          </Box>
     <Button
    variant="contained"
    color="primary"
    onClick={() => {
       navigate("/ajouter-client")
    }}
  >
    + Ajouter un client
  </Button>
        </Stack>

        {/* 📊 Statistiques */}
        <Grid container spacing={3} mb={4}>
          {/* Conventions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#f3e5f5" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Conventions signées
                </Typography>
                <Typography variant="h4">
                  {mockClients.reduce((acc, c) => acc + c.conventions, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Entreprises */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Entreprises partenaires
                </Typography>
                <Typography variant="h4">{entrepriseStats.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Clients par Wilaya */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#ede7f6" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Wilayas les plus représentées
                </Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={wilayaStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="wilaya" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6a1b9a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 📋 Tableau des clients */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Entreprise</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Wilaya</TableCell>
                <TableCell>Commandes</TableCell>
                <TableCell>Montant (DA)</TableCell>
                <TableCell>Conventions</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.nom}</TableCell>
                  <TableCell>{client.entreprise}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.telephone}</TableCell>
                  <TableCell>{client.wilaya}</TableCell>
                  <TableCell>{client.commandes}</TableCell>
                  <TableCell>{client.montant.toLocaleString()}</TableCell>
                  <TableCell>{client.conventions}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" title="Consulter">
                      <Visibility />
                    </IconButton>
                    <IconButton color="warning" title="Modifier">
                      <Edit />
                    </IconButton>
                    <IconButton color="error" title="Supprimer">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
