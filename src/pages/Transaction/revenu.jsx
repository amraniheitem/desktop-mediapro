// Revenus.jsx
import React, { useMemo, useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./revenu.css";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Info, FileDownload } from "@mui/icons-material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

/*
  Page Revenus pour Media Pro
  - cartes résumé
  - camembert répartition par source
  - courbe d'évolution mensuelle
  - tableau détaillé (données mixtes)
  - fenêtre de détail pour chaque entrée
*/

// === Mock data d'exemple ===
// commandes confirmées (chaque objet représente une transaction)
const mockOrders = [
  { id: 1, date: "2025-07-05", type: "animateur", total: 20000, service: "Mariage Oran" },
  { id: 2, date: "2025-07-10", type: "voice-over", total: 12000, service: "Spot Radio" },
  { id: 3, date: "2025-07-14", type: "formation", total: 8000, service: "Montage Vidéo" },
  { id: 4, date: "2025-08-02", type: "produit", total: 5000, service: "Casquette" },
  { id: 5, date: "2025-08-04", type: "animateur", total: 25000, service: "Soirée VIP" },
];

// abonnements récurrents
const mockSubscriptions = [
  { id: "S1", date: "2025-08-01", plan: "Prestataire Premium", price: 1500 },
  { id: "S2", date: "2025-08-03", plan: "Organisateur Pro", price: 3000 },
];

// ventes produit / marketplace
const mockProductSales = [
  { id: "P1", date: "2025-07-20", name: "Micro X200", price: 12000, marginPercent: 0.2 },
  { id: "P2", date: "2025-08-06", name: "Casque Pro", price: 7000, marginPercent: 0.2 },
];

// publicités & offres sponsorisées
const mockAds = [
  { id: "A1", date: "2025-07-25", client: "Marque A", amount: 8000 },
  { id: "A2", date: "2025-08-05", client: "Agence B", amount: 15000 },
];

// formations payantes (ventes)
const mockCourses = [
  { id: "C1", date: "2025-07-28", title: "Voix-Off Débutant", price: 3000 },
  { id: "C2", date: "2025-08-07", title: "Masterclass Animation", price: 6000 },
];

// offres sponsor / boosts (mise en avant)
const mockBoosts = [
  { id: "B1", date: "2025-08-08", prestataire: "Ali", price: 2000 },
];

// Paramètre répartition (tu as demandé 30% pour Media Pro, 70% prestataire)
const COMMISSION_RATE = 0.3;

// utilitaires
const formatDA = (n) =>
  typeof n === "number" ? `${n.toLocaleString("fr-FR")} DA` : n;

// Construire la liste unifiée des entrées de revenus (pour le tableau)
function buildRevenueEntries() {
  const entries = [];

  // commissions issues des commandes (Media Pro prend 30% de total)
  mockOrders.forEach((o) => {
    const commission = Math.round(o.total * COMMISSION_RATE);
    entries.push({
      id: `CMD-${o.id}`,
      date: o.date,
      source: "Commande confirmée",
      detail: `${o.type} — ${o.service}`,
      gross: o.total,
      net: commission,
      split: { platform: commission, provider: o.total - commission },
      meta: o,
    });
  });

  // abonnements (100% pour la plateforme)
  mockSubscriptions.forEach((s) => {
    entries.push({
      id: s.id,
      date: s.date,
      source: "Abonnement",
      detail: s.plan,
      gross: s.price,
      net: s.price,
      split: { platform: s.price, provider: 0 },
      meta: s,
    });
  });

  // ventes produit (marge partagée ou vente directe)
  mockProductSales.forEach((p) => {
    const platformMargin = Math.round(p.price * p.marginPercent);
    entries.push({
      id: p.id,
      date: p.date,
      source: "Vente produit",
      detail: p.name,
      gross: p.price,
      net: platformMargin,
      split: { platform: platformMargin, provider: p.price - platformMargin },
      meta: p,
    });
  });

  // publicités
  mockAds.forEach((a) => {
    entries.push({
      id: a.id,
      date: a.date,
      source: "Publicité",
      detail: a.client,
      gross: a.amount,
      net: a.amount,
      split: { platform: a.amount, provider: 0 },
      meta: a,
    });
  });

  // formations payantes
  mockCourses.forEach((c) => {
    const platformShare = Math.round(c.price * COMMISSION_RATE); // appliquons commission 30% si formateur n'est pas interne
    entries.push({
      id: c.id,
      date: c.date,
      source: "Formation payante",
      detail: c.title,
      gross: c.price,
      net: platformShare,
      split: { platform: platformShare, provider: c.price - platformShare },
      meta: c,
    });
  });

  // boosts / offres sponsor
  mockBoosts.forEach((b) => {
    entries.push({
      id: b.id,
      date: b.date,
      source: "Offre sponsor / Boost",
      detail: b.prestataire,
      gross: b.price,
      net: b.price,
      split: { platform: b.price, provider: 0 },
      meta: b,
    });
  });

  // trier par date (desc)
  entries.sort((a, b) => (a.date < b.date ? 1 : -1));
  return entries;
}

export default function Revenus() {
  const [active] = useState("Revenus");
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [entries] = useState(buildRevenueEntries());
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // totaux calculés
  const totals = useMemo(() => {
    const totalGross = entries.reduce((s, e) => s + (e.gross || 0), 0);
    const totalNet = entries.reduce((s, e) => s + (e.net || 0), 0);
    // par source
    const bySource = entries.reduce((acc, e) => {
      acc[e.source] = acc[e.source] || 0;
      acc[e.source] += e.net || 0;
      return acc;
    }, {});
    return { totalGross, totalNet, bySource };
  }, [entries]);

  // données pour camembert (répartition par source)
  const pieData = useMemo(() => {
    return Object.entries(totals.bySource).map(([source, value]) => ({
      name: source,
      value,
    }));
  }, [totals]);

  // données évolution mensuelle (mock: on agrège par mois AAAA-MM)
  const monthlyData = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      const month = e.date.slice(0, 7); // "2025-08"
      map[month] = map[month] || 0;
      map[month] += e.net || 0;
    });
    const arr = Object.entries(map)
      .map(([month, val]) => ({ month, value: val }))
      .sort((a, b) => (a.month > b.month ? 1 : -1));
    return arr;
  }, [entries]);

  // filtration + recherche pour le tableau
  const filtered = entries.filter((e) => {
    const matchSearch =
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.detail.toLowerCase().includes(search.toLowerCase()) ||
      e.source.toLowerCase().includes(search.toLowerCase());
    const matchSource = filterSource === "all" || e.source === filterSource;
    return matchSearch && matchSource;
  });

  // couleurs pour pie chart
  const COLORS = ["#4f46e5", "#f59e0b", "#ef4444", "#10b981", "#06b6d4", "#8b5cf6"];

  // ouvrir dialogue détail
  const openDetail = (entry) => {
    setSelectedEntry(entry);
    setDialogOpen(true);
  };
  const closeDetail = () => {
    setDialogOpen(false);
    setSelectedEntry(null);
  };

  // export CSV simple
  const exportCSV = () => {
    const header = ["id", "date", "source", "detail", "gross", "net"];
    const rows = filtered.map((r) => [r.id, r.date, r.source, r.detail, r.gross, r.net]);
    const csv = [header.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `revenus_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />
      <Box className="revenus-container" flex={1} p={3}>
        <Typography variant="h4" gutterBottom color="primary">
          Tableau de bord — Revenus
        </Typography>

        {/* Résumés */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
          <Paper className="card" elevation={2}>
            <Typography className="card-title">Revenu total</Typography>
            <Typography variant="h5" className="card-value">{formatDA(totals.totalNet)}</Typography>
            <Typography className="card-sub">Net collecté par Media Pro</Typography>
          </Paper>

          <Paper className="card" elevation={2}>
            <Typography className="card-title">Revenu brut</Typography>
            <Typography variant="h5" className="card-value">{formatDA(totals.totalGross)}</Typography>
            <Typography className="card-sub">Somme totale des transactions</Typography>
          </Paper>

          <Paper className="card" elevation={2}>
            <Typography className="card-title">Abonnements</Typography>
            <Typography variant="h5" className="card-value">{formatDA(totals.bySource["Abonnement"] || 0)}</Typography>
            <Typography className="card-sub">Revenus récurrents</Typography>
          </Paper>

          <Paper className="card" elevation={2}>
            <Typography className="card-title">Publicité & boosts</Typography>
            <Typography variant="h5" className="card-value">{formatDA((totals.bySource["Publicité"] || 0) + (totals.bySource["Offre sponsor / Boost"] || 0))}</Typography>
            <Typography className="card-sub">Bannières, boosts, sponsors</Typography>
          </Paper>
        </Stack>

        {/* Charts + contrôles */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
          <Paper className="chart-card" elevation={1}>
            <Typography className="chart-title">Répartition par source</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip formatter={(value) => formatDA(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          <Paper className="chart-card" elevation={1}>
            <Typography className="chart-title">Évolution mensuelle</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ReTooltip formatter={(value) => formatDA(value)} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Stack>

        {/* Contrôles recherche / filtre / export */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" mb={2}>
          <TextField size="small" label="Rechercher (id, détail, source)" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 240 }} />
          <Select size="small" value={filterSource} onChange={(e) => setFilterSource(e.target.value)} sx={{ minWidth: 200 }}>
            <MenuItem value="all">Toutes les sources</MenuItem>
            {Array.from(new Set(entries.map((e) => e.source))).map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={exportCSV}>Exporter CSV</Button>
        </Stack>

        {/* Tableau détaillé */}
        <Paper className="table-paper" elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4f46e5", "& .MuiTableCell-root": { color: "white" } }}>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Détail</TableCell>
                <TableCell align="right">Montant brut</TableCell>
                <TableCell align="right">Montant net (Media Pro)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.source}</TableCell>
                  <TableCell>{r.detail}</TableCell>
                  <TableCell align="right">{formatDA(r.gross)}</TableCell>
                  <TableCell align="right">{formatDA(r.net)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => openDetail(r)}><Info /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Dialog détail entrée */}
        <Dialog open={dialogOpen} onClose={closeDetail} maxWidth="sm" fullWidth>
          <DialogTitle>Détail du revenu</DialogTitle>
          <DialogContent dividers>
            {selectedEntry && (
              <>
                <Typography><strong>ID :</strong> {selectedEntry.id}</Typography>
                <Typography><strong>Date :</strong> {selectedEntry.date}</Typography>
                <Typography><strong>Source :</strong> {selectedEntry.source}</Typography>
                <Typography><strong>Détail :</strong> {selectedEntry.detail}</Typography>
                <Typography><strong>Montant brut :</strong> {formatDA(selectedEntry.gross)}</Typography>
                <Typography><strong>Montant net (Media Pro) :</strong> {formatDA(selectedEntry.net)}</Typography>
                <Typography><strong>Répartition :</strong></Typography>
                <ul>
                  <li>Media Pro: {formatDA(selectedEntry.split.platform)} (30%)</li>
                  <li>Prestataire / Vendeur: {formatDA(selectedEntry.split.provider)} (70% ou marge restante)</li>
                </ul>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetail}>Fermer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
