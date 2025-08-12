import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import { Box, Typography, Card, CardContent, Button, Avatar, Grid, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./evaluation.css";

export default function Eval() {
  const [active] = useState("Évaluations");
  const [serviceFilter, setServiceFilter] = useState("Tous");
  const [periodeFilter, setPeriodeFilter] = useState("Mois");

  // Données graphiques services les plus demandés
  const serviceData = [
    { name: "Animation", value: 40 },
    { name: "Voix Off", value: 30 },
    { name: "Présentation TV", value: 20 },
    { name: "Autres", value: 10 }
  ];
  const COLORS = ["#4f46e5", "#16a34a", "#f59e0b", "#ef4444"];

  // Données classement animateurs
  const topAnimateurs = [
    { id: 1, nom: "Mohamed Ali", score: 4.8, missions: 52 },
    { id: 2, nom: "Sarah Ben", score: 4.7, missions: 45 },
    { id: 3, nom: "Karim DJ", score: 4.6, missions: 39 },
    { id: 4, nom: "Lina Art", score: 4.5, missions: 33 },
    { id: 5, nom: "Amine Show", score: 4.4, missions: 28 }
  ];

  // Données classement voix-off
  const topVoixOff = [
    { id: 1, nom: "Rachid Voice", score: 4.9, missions: 40 },
    { id: 2, nom: "Samira Voice", score: 4.8, missions: 37 },
    { id: 3, nom: "Hakim Voice", score: 4.7, missions: 32 },
    { id: 4, nom: "Nadia Voice", score: 4.6, missions: 28 },
    { id: 5, nom: "Yassine Voice", score: 4.5, missions: 25 }
  ];

  // Avis récents
  const avis = [
    { id: 1, client: "Ahmed", service: "Animation", note: 5, commentaire: "Excellent !" },
    { id: 2, client: "Fatima", service: "Voix Off", note: 4, commentaire: "Très bien" },
    { id: 3, client: "Omar", service: "Formation", note: 5, commentaire: "Très utile" },
    { id: 4, client: "Sara", service: "Produit", note: 4, commentaire: "Bonne qualité" }
  ];

  const columns = [
    { field: "client", headerName: "Client", width: 150 },
    { field: "service", headerName: "Service", width: 200 },
    { field: "note", headerName: "Note ★", width: 100 },
    { field: "commentaire", headerName: "Commentaire", width: 300 }
  ];

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar active={active} setActive={() => {}} />

      {/* Contenu principal */}
      <Box flex={1} className="eval-dashboard">
        <Typography variant="h4" className="eval-title">📊 Dashboard Évaluations</Typography>

        {/* Statistiques globales */}
<Grid container spacing={3} className="stats-section">
          <Grid item xs={12} md={4}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="h5">Note Globale</Typography>
                <Typography variant="h3">4.5 ★</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="h5">Total Avis</Typography>
                <Typography variant="h3">256</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="h5">Formations évaluées</Typography>
                <Typography variant="h3">12</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Graphique services */}
<Grid container spacing={3} className="chart-section">
          <Grid item xs={12} md={6}>
            <Card >
              <CardContent className="card-eval" >
                <Typography variant="h6">Services les plus demandés</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Répartition par service</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={serviceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
<div style={{ height: 20 }} />
<div style={{ height: 20 }} />

        {/* Classements */}
<Grid container spacing={3} className="ranking-section">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Animateurs</Typography>
                {topAnimateurs.map((a) => (
                  <Box key={a.id} className="ranking-item">
                    <Avatar>{a.nom[0]}</Avatar>
                    <Typography>{a.nom} — {a.score} ★ ({a.missions} missions)</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Voix Off</Typography>
                {topVoixOff.map((v) => (
                  <Box key={v.id} className="ranking-item">
                    <Avatar>{v.nom[0]}</Avatar>
                    <Typography>{v.nom} — {v.score} ★ ({v.missions} missions)</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtres */}
        <Box display="flex" gap={2} className="filters">
          <Select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
            <MenuItem value="Tous">Tous les services</MenuItem>
            <MenuItem value="Animation">Animation</MenuItem>
            <MenuItem value="Voix Off">Voix Off</MenuItem>
            <MenuItem value="Produit">Produit</MenuItem>
            <MenuItem value="Boutique">Boutique</MenuItem>
            <MenuItem value="Formation">Formation</MenuItem>
          </Select>

          <Select value={periodeFilter} onChange={(e) => setPeriodeFilter(e.target.value)}>
            <MenuItem value="Semaine">Cette semaine</MenuItem>
            <MenuItem value="Mois">Ce mois</MenuItem>
            <MenuItem value="Année">Cette année</MenuItem>
          </Select>
        </Box>

        {/* Liste des avis */}
        <Card className="table-section">
          <CardContent>
            <Typography variant="h6">Avis récents</Typography>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid rows={avis} columns={columns} pageSize={5} />
            </div>
            <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Voir tous les avis
            </Button>
            <Button variant="outlined" color="success" style={{ marginTop: "10px", marginLeft: "10px" }}>
              Ajouter une évaluation
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
