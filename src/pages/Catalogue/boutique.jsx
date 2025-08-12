import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./boutique.css"
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";

export default function Boutique() {
  const [tab, setTab] = useState(0);

  // Produits
  const [produits, setProduits] = useState([
    { id: 1, nom: "Produit A", prix: 1200, stock: 15, statut: "Disponible" },
    { id: 2, nom: "Produit B", prix: 800, stock: 0, statut: "Rupture" },
  ]);
  const [newProduit, setNewProduit] = useState({ nom: "", prix: "", stock: "" });

  // Boutiques
  const [boutiques, setBoutiques] = useState([
    { id: 1, nom: "Boutique X", responsable: "Ahmed", produits: 20, stats: "Bonne" },
    { id: 2, nom: "Boutique Y", responsable: "Sara", produits: 12, stats: "Moyenne" },
  ]);
  const [newBoutique, setNewBoutique] = useState({ nom: "", responsable: "", produits: "" });

  const handleAddProduit = () => {
    if (!newProduit.nom || !newProduit.prix || !newProduit.stock) return;
    setProduits([
      ...produits,
      {
        id: produits.length + 1,
        nom: newProduit.nom,
        prix: parseFloat(newProduit.prix),
        stock: parseInt(newProduit.stock),
        statut: parseInt(newProduit.stock) > 0 ? "Disponible" : "Rupture",
      },
    ]);
    setNewProduit({ nom: "", prix: "", stock: "" });
  };

  const handleAddBoutique = () => {
    if (!newBoutique.nom || !newBoutique.responsable || !newBoutique.produits) return;
    setBoutiques([
      ...boutiques,
      {
        id: boutiques.length + 1,
        nom: newBoutique.nom,
        responsable: newBoutique.responsable,
        produits: parseInt(newBoutique.produits),
        stats: parseInt(newBoutique.produits) > 15 ? "Bonne" : "Moyenne",
      },
    ]);
    setNewBoutique({ nom: "", responsable: "", produits: "" });
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <Box className='content-product' flexGrow={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Gestion Boutique
        </Typography>

        {/* Onglets */}
        <Tabs value={tab} onChange={(e, val) => setTab(val)}>
          <Tab label="Produits" />
          <Tab label="Boutiques" />
        </Tabs>

        {/* PRODUITS */}
        {tab === 0 && (
          <Box>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Liste des Produits</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Statut</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produits.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.nom}</TableCell>
                      <TableCell>{p.prix} DA</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell>{p.statut}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            {/* Formulaire ajout produit */}
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Ajouter Produit</Typography>
              <TextField
                label="Nom"
                value={newProduit.nom}
                onChange={(e) => setNewProduit({ ...newProduit, nom: e.target.value })}
                sx={{ mr: 2 }}
              />
              <TextField
                label="Prix"
                type="number"
                value={newProduit.prix}
                onChange={(e) => setNewProduit({ ...newProduit, prix: e.target.value })}
                sx={{ mr: 2 }}
              />
              <TextField
                label="Stock"
                type="number"
                value={newProduit.stock}
                onChange={(e) => setNewProduit({ ...newProduit, stock: e.target.value })}
                sx={{ mr: 2 }}
              />
              <Button variant="contained" onClick={handleAddProduit}>
                Ajouter
              </Button>
            </Paper>
          </Box>
        )}

        {/* BOUTIQUES */}
        {tab === 1 && (
          <Box>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Liste des Boutiques</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Responsable</TableCell>
                    <TableCell>Produits</TableCell>
                    <TableCell>Statistiques</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {boutiques.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>{b.nom}</TableCell>
                      <TableCell>{b.responsable}</TableCell>
                      <TableCell>{b.produits}</TableCell>
                      <TableCell>{b.stats}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            {/* Formulaire ajout boutique */}
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Ajouter Boutique</Typography>
              <TextField
                label="Nom"
                value={newBoutique.nom}
                onChange={(e) => setNewBoutique({ ...newBoutique, nom: e.target.value })}
                sx={{ mr: 2 }}
              />
              <TextField
                label="Responsable"
                value={newBoutique.responsable}
                onChange={(e) => setNewBoutique({ ...newBoutique, responsable: e.target.value })}
                sx={{ mr: 2 }}
              />
              <TextField
                label="Nb Produits"
                type="number"
                value={newBoutique.produits}
                onChange={(e) => setNewBoutique({ ...newBoutique, produits: e.target.value })}
                sx={{ mr: 2 }}
              />
              <Button variant="contained" onClick={handleAddBoutique}>
                Ajouter
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}
