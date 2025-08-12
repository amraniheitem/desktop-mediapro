import { useState } from "react";
import Sidebar from "../components/sidebar";
import "./dashboard.css";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  const [active, setActive] = useState("Tableau de bord");

  const renderContent = () => {
    switch (active) {
      case "Tableau de bord":
        return (
          <>
            <div className="cards">
              <div className="card-dash">🎤 <strong>45</strong><br /> Animateurs</div>
              <div className="card-dash">🎧 <strong>30</strong><br /> Voix-off</div>
              <div className="card-dash">👥 <strong>320</strong><br /> Clients</div>
              <div className="card-dash">🛠️ <strong>12</strong><br /> Services</div>
              <div className="card-dash">🛍️ <strong>58</strong><br /> Produits</div>
              <div className="card-dash">🎓 <strong>22</strong><br /> Formations</div>
              <div className="card-dash">📦 <strong>150</strong><br /> Commandes</div>
              <div className="card-dash">💶 <strong>4 500 €</strong><br /> Revenus</div>
            </div>

            <div className="charts">
              <div className="chart">
                <h3>Commandes</h3>
                <img src="/bar-chart-placeholder.png" alt="Commandes Chart" />
              </div>
              <div className="chart">
                <h3>Revenus</h3>
                <img src="/line-chart-placeholder.png" alt="Revenus Chart" />
              </div>
            </div>
          </>
        );
      default:
        return <Typography>Page {active}</Typography>;
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box className="dashboard" flex={1} sx={{  }}>
        <h2>{active}</h2>
        {renderContent()}
      </Box>
    </Box>
  );
}
