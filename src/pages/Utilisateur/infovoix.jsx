import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { PictureAsPdf as PdfIcon, Edit as EditIcon } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import "./infoanim.css";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";

function Voixinfo() {
  const [active, setActive] = useState("Animateurs");
  const fileInputRef = useRef(null);

  // Animateur mock
  const animateur = {
    image: "https://via.placeholder.com/120",
    name: "Ali Bensalah",
    wilaya: "Alger",
    ranking: "4.8",
    description: "Niveau: Expert",
    email: "ali.bensalah@email.com",
    phone: "0555 55 55 55",
    adresse: "Rue des jasmins, Alger",
    domaines: ["Mariage", "Corporate", "Musique"],
    langues: ["Français", "Arabe", "Anglais"],
    activites: [
      "A animé un mariage le 1 Août",
      "Intervenu dans un événement corporate le 28 Juillet",
    ],
  };

  // 📤 Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Profil de l'animateur : ${animateur.name}`, 10, 10);
    doc.text(`Wilaya : ${animateur.wilaya}`, 10, 20);
    doc.text(`Email : ${animateur.email}`, 10, 30);
    doc.text(`Téléphone : ${animateur.phone}`, 10, 40);
    doc.text(`Adresse : ${animateur.adresse}`, 10, 50);
    doc.text(`Description : ${animateur.description}`, 10, 60);
    doc.text(`Domaines : ${animateur.domaines.join(", ")}`, 10, 70);
    doc.text(`Langues : ${animateur.langues.join(", ")}`, 10, 80);
    doc.save(`${animateur.name}_profil.pdf`);
  };

  // 🖼️ Changement de photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert("Photo changée (mock). Nom: " + file.name);
    }
  };

  const handleEdit = () => {
    alert("Fonction modifier déclenchée.");
  };

  const handleDelete = () => {
    alert("Fonction supprimer déclenchée.");
  };

  return (
    <Box className="box">
      <Sidebar active={active} setActive={setActive} />

      <Box className="content-anim">
        <Box className="profile-card">
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={animateur.image}
              alt="Profile"
              sx={{ width: 120, height: 120, border: "3px solid #fff", cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <Typography variant="caption" sx={{ position: "absolute", bottom: -20, left: 0 }}>
              Modifier la photo
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 2 }}>
            {animateur.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            {animateur.wilaya}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <Box className="star-icon">
              <FaStar color="white" />
            </Box>
            <Typography variant="h5">{animateur.ranking}</Typography>
          </Box>

          <Typography variant="body2" className="description">
            {animateur.description}
          </Typography>

          <div className="update-delete">
            <Button variant="contained" className="update" onClick={handleEdit}>
              <FaEdit /> Modifier
            </Button>
            <Button variant="contained" className="delete" onClick={handleDelete}>
              <FaTrash /> Supprimer
            </Button>
            <IconButton onClick={handleExportPDF}>
              <PdfIcon />
            </IconButton>
          </div>
        </Box>

        <Box className="info">
          <Typography variant="h4">Informations</Typography>
          <Box className="infos-container">
            <Typography variant="body1">
              <strong>Email:</strong> {animateur.email}
            </Typography>
          </Box>
          <Box className="infos-container">
            <Typography variant="body1">
              <strong>Téléphone:</strong> {animateur.phone}
            </Typography>
          </Box>
          <Box className="infos-container">
            <Typography variant="body1">
              <strong>Wilaya:</strong> {animateur.wilaya}
            </Typography>
          </Box>
          <Box className="infos-container">
            <Typography variant="body1">
              <strong>Adresse:</strong> {animateur.adresse}
            </Typography>
          </Box>

          {/* 🌐 Domaines */}
          <Box className="infos-container">
            <Typography variant="body1"><strong>Domaines :</strong></Typography>
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {animateur.domaines.map((domaine, i) => (
                <Chip key={i} label={domaine} />
              ))}
            </Box>
          </Box>

          {/* 🗣️ Langues */}
          <Box className="infos-container">
            <Typography variant="body1"><strong>Langues :</strong></Typography>
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {animateur.langues.map((langue, i) => (
                <Chip key={i} label={langue} color="primary" />
              ))}
            </Box>
          </Box>

          {/* 🕓 Activité récente */}
          <Box className="infos-container">
            <Typography variant="body1"><strong>Activité récente :</strong></Typography>
            <ul style={{ marginLeft: 20 }}>
              {animateur.activites.map((act, i) => (
                <li key={i}>
                  <Typography variant="body2">{act}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Voixinfo;
