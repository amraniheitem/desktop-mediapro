import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Avatar,
  Paper
} from "@mui/material";
import "./parametre.css"; // CSS qu’on a déjà fait

export default function Param() {
  const [active] = useState("Paramètres");
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("fr");
  const [themeColor, setThemeColor] = useState("blue");
  const [isAdmin] = useState(true); // change à false pour tester côté user

  // Exemple de données utilisateur (à remplacer par API)
  const userProfile = {
    avatar: "https://via.placeholder.com/100",
    nom: "Amrani",
    prenom: "Heitem",
    email: "heitem@example.com",
    role: isAdmin ? "Administrateur" : "Utilisateur"
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />

      <Box className="settings-container" flex={1} p={3}>
        <Typography variant="h4" gutterBottom color="primary">
          Page des paramètres
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Gérez votre profil, votre sécurité, votre interface et les options administratives.
        </Typography>

        {/* Onglets */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Compte & Sécurité" />
          <Tab label="Interface & Accessibilité" />
          {isAdmin && <Tab label="Administration" />}
        </Tabs>

        <Divider sx={{ my: 2 }} />

        {/* ----------------- Compte & Sécurité ----------------- */}
        {tabValue === 0 && (
          <Box>
            {/* Profil utilisateur */}
            <Typography variant="h6" gutterBottom>
              Profil du compte
            </Typography>
            <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={userProfile.avatar} sx={{ width: 80, height: 80 }} />
              <Box>
                <Typography variant="body1">
                  <strong>Nom :</strong> {userProfile.nom}
                </Typography>
                <Typography variant="body1">
                  <strong>Prénom :</strong> {userProfile.prenom}
                </Typography>
                <Typography variant="body1">
                  <strong>Email :</strong> {userProfile.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Rôle :</strong> {userProfile.role}
                </Typography>
              </Box>
            </Paper>

            <Divider sx={{ my: 4 }} />

            {/* Changer le mot de passe */}
            <Typography variant="h6" gutterBottom>
              Changer le mot de passe
            </Typography>
            <TextField
              label="Ancien mot de passe"
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nouveau mot de passe"
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirmer le nouveau mot de passe"
              type="password"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" sx={{ mt: 2 }}>
              Sauvegarder
            </Button>

            <Divider sx={{ my: 4 }} />

            {/* Sécurité avancée */}
            <Typography variant="h6" gutterBottom>
              Sécurité avancée
            </Typography>
            <FormControlLabel
              control={<Switch />}
              label="Activer la double authentification (2FA)"
            />
            <Button variant="outlined" sx={{ ml: 2 }}>
              Gérer les appareils connectés
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }}>
              Voir l'historique de connexion
            </Button>
          </Box>
        )}

        {/* ----------------- Interface & Accessibilité ----------------- */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Apparence
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              }
              label="Mode sombre"
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Couleur du thème</InputLabel>
              <Select
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
              >
                <MenuItem value="blue">Bleu</MenuItem>
                <MenuItem value="purple">Violet</MenuItem>
                <MenuItem value="red">Rouge</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Accessibilité
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              }
              label="Activer les notifications"
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Langue</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="ar">العربية</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* ----------------- Administration ----------------- */}
        {isAdmin && tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Gestion des administrateurs
            </Typography>
            <Button variant="contained">Ajouter un nouvel admin</Button>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Gestion des utilisateurs
            </Typography>
            <Button variant="outlined">Réinitialiser mot de passe</Button>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Statistiques de la plateforme
            </Typography>
            <Button variant="outlined">Voir les statistiques</Button>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Paramètres système
            </Typography>
            <Button variant="outlined">Configurer l’email SMTP</Button>
            <Button variant="outlined" sx={{ ml: 2 }}>
              Gérer les API
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
