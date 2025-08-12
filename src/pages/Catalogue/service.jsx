// src/pages/Service.jsx
import { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import { useNavigate } from "react-router-dom";
import "./service.css";

export default function Service() {
  const [active] = useState("Services");
  const navigate = useNavigate();

  const services = [
    { title: "Gestion des Événements", emoji: "📅", route: "/services/evenements" },
    { title: "Conseils", emoji: "💡", route: "/services/conseille" },
    { title: "Promotions", emoji: "🎁", route: "/services/promotions" },
    { title: "Candidature Mediapro Team", emoji: "🎥", route: "/services/mediapro" },
  ];

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />

      <Box className="content-service" flex={1}>
        {/* Bannière */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #7b2ff7, #00c6ff)",
            color: "#fff",
            padding: "30px 20px",
            textAlign: "center",
            borderRadius: "0 0 20px 20px",
            mb: 4
          }}
        >
          <Typography variant="h3" fontWeight="bold">Nos Services</Typography>
          <Typography variant="subtitle1">
            Découvrez nos services et choisissez celui qui correspond à vos besoins.
          </Typography>
        </Box>

        {/* Cartes des services */}
        <Box className="services-container">
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card"
              onClick={() => navigate(service.route)}
            >
              <CardContent>
                <Typography variant="h2" align="center">{service.emoji}</Typography>
                <Typography variant="h6" align="center" mt={2}>
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Statistiques */}
        <Box className="stats-section">
          <Box className="stat-box">
            <Typography variant="h5">124</Typography>
            <Typography>Événements Organisés</Typography>
          </Box>
          <Box className="stat-box">
            <Typography variant="h5">98%</Typography>
            <Typography>Satisfaction Client</Typography>
          </Box>
          <Box className="stat-box">
            <Typography variant="h5">12</Typography>
            <Typography>Promotions Actives</Typography>
          </Box>
          <Box className="stat-box">
            <Typography variant="h5">25</Typography>
            <Typography>Membres Mediapro Team</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
